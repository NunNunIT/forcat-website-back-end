// import utils
import { decryptData, encryptData } from "../../utils/security.js";
import uploadImgToCld, { CLD_DEFAULT_UPLOAD_FOLDER, CLD_SEO_FOLDER } from "../../utils/uploadImgtoCld.js";
import { removeFile } from "../../utils/handleFile.js";

// import handlers
import responseHandler from "../../handlers/response.handler.js";

// import models
import Article from "../../models/article.model.js";
import { createSlug } from "../../utils/createSlug.js";

const handleArticleInfo = (article) => ({
  article_id_hashed: encryptData(article._id.toString()),
  article_name: article.article_name,
  article_slug: article.article_slug,
  article_type: article.article_type,
  article_author: article.article_info.author,
  article_date_published: article.article_info.published_date,
  article_short_description: article.article_short_description,
  createdAt: article.createdAt,
});

// [POST] /api/admin/articles/
export const createArticle = async (req, res, next) => {
  const article_avt_blob = req.file;
  const {
    article_name,
    article_avt: article_avt_json,
    article_type,
    article_info: article_info_json,
    article_short_description,
    article_subtitle,
    article_content
  } = req.body;

  const article_avt = JSON.parse(article_avt_json ?? "{}");
  const article_info = JSON.parse(article_info_json ?? "{}");

  if (!article_name || !article_avt || !article_type || !article_info || !article_short_description || !article_subtitle || !article_content)
    return responseHandler.badRequest(res, "Invalid article data");

  if (!article_avt_blob && !article_avt.link)
    responseHandler.badRequest(res, "Invalid article_avt");

  // console.log(">> article_avt_blob", article_avt_blob);

  // return responseHandler.created(res, null, "Created");

  try {
    if (article_avt_blob) {
      const { originalname, path } = article_avt_blob;
      const originalnameWithoutExt = originalname.split(".").slice(0, -1).join(".");
      const originalnameSlug = createSlug(originalnameWithoutExt);
      const imgFolder = "Articles/" + (req.body?.imgFolder ?? CLD_DEFAULT_UPLOAD_FOLDER);
      const imgPath = `${CLD_SEO_FOLDER}/${imgFolder}/${originalnameSlug}`;

      const resCld = await uploadImgToCld(
        path,
        { public_id: imgPath, }
      );

      removeFile(path);
      article_avt.link = resCld.secure_url;
    }

    const newArticle = new Article({
      article_name,
      article_avt,
      article_type,
      article_info,
      article_short_description,
      article_subtitle,
      article_content
    });

    await newArticle.save();

    return responseHandler.ok(res, null, "Created");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// [GET] /api/admin/articles/
export const getArticles = async (req, res, next) => {
  const sortedFields = { createdAt: -1 }
  const query = {};

  try {
    const articles = await Article.find(
      query,
      { article_content: 0, }
    ).sort(sortedFields);

    if (!articles)
      return responseHandler.notFound(res, "Articles Not Found");

    const handledArticle = articles.map(handleArticleInfo);

    return responseHandler.ok(res, { maxPage: 1, article: handledArticle });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// [GET] /api/admin/articles/:article_id_hashed
export const getArticle = async (req, res, next) => {
  const articleIDHashed = req.params.article_id_hashed;
  if (!articleIDHashed)
    return responseHandler.badRequest(res, "Invalid article ID");

  const articleID = decryptData(articleIDHashed);
  if (!articleID)
    return responseHandler.badRequest(res, "Invalid article ID");

  try {
    const article = await Article.findOne({
      _id: articleID,
    });

    if (!article)
      return responseHandler.notFound(res, "Article Not Found");

    const handledArticle = {
      ...handleArticleInfo(article),
      article_subtitle: article.article_subtitle,
      article_content: article.article_content,
      article_avt: article.article_avt,
    };

    return responseHandler.ok(res, handledArticle);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// [POST] /api/admin/articles/:article_id_hashed
export const updateArticle = async (req, res, next) => {
  const { article_id_hashed } = req.params;
  const {
    article_name,
    article_type,
    article_info: article_info_json,
    article_short_description,
    article_subtitle,
    article_avt: article_avt_json,
    article_content
  } = req.body;

  const article_avt_blob = req.file;

  if (!article_id_hashed
    || !article_name
    || !article_type
    || !article_info_json
    || !article_short_description
    || !article_subtitle
    || !article_content
    || !article_avt_json
  ) return responseHandler.badRequest(res, "Invalid article data");

  const articleID = decryptData(article_id_hashed);
  if (!articleID)
    return responseHandler.badRequest(res, "Invalid article ID");

  const article_info = JSON.parse(article_info_json);
  const article_avt = JSON.parse(article_avt_json);

  const query = { _id: articleID };

  try {
    const article = await Article.findOne(query);

    if (!article)
      return responseHandler.notFound(res, "Article not found!");

    if (article_avt_blob) {
      const { originalname, path } = article_avt_blob;
      const originalnameWithoutExt = originalname.split(".").slice(0, -1).join(".");
      const originalnameSlug = createSlug(originalnameWithoutExt);
      const imgFolder = "Articles/" + (req.body?.imgFolder ?? CLD_DEFAULT_UPLOAD_FOLDER);
      const imgPath = `${CLD_SEO_FOLDER}/${imgFolder}/${originalnameSlug}`;

      const resCld = await uploadImgToCld(
        path,
        { public_id: imgPath, }
      );

      removeFile(path);
      article_avt.link = resCld.secure_url;
    }

    // Update order_status, order_process_info
    await Article.findOneAndUpdate(query, {
      article_name,
      article_type,
      article_info,
      article_short_description,
      article_subtitle,
      article_avt,
      article_content,
    });

    return responseHandler.ok(res, null, "Updated");
  } catch (err) {
    console.error(err);
    next(err);
  }
}