import { decryptData, encryptData } from "../../utils/security.js";
import responseHandler from "../../handlers/response.handler.js";
import Article from "../../models/article.model.js";

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
  const {
    article_name,
    article_avt,
    article_type,
    article_info,
    article_short_description,
    article_subtitle,
    article_content
  } = req.body;

  if (!article_name || !article_avt || !article_type || !article_info || !article_short_description || !article_subtitle || !article_content)
    return responseHandler.badRequest(res, "Invalid article data");

  try {
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
    console.log(err);
    next(err);
  }
}

// [GET] /api/admin/articles/
export const getArticles = async (req, res, next) => {
  const sortedFields = { createdAt: -1 }
  const query = {};

  try {
    const articles = await Article.find(
      query, {
      article_content: 0,
    }).sort(sortedFields);

    if (!articles)
      return responseHandler.notFound(res, "Articles Not Found");

    const handledArticle = articles.map(handleArticleInfo);

    return responseHandler.ok(res, { maxPage: 1, article: handledArticle });
  } catch (err) {
    console.log(err);
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
    };

    return responseHandler.ok(res, handledArticle);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// [POST] /api/admin/articles/:article_id_hashed
export const updateArticle = async (req, res, next) => {
  const { article_id_hashed } = req.params;
  const {
    article_name,
    article_type,
    article_info,
    article_short_description,
    article_subtitle,
    article_content
  } = req.body;

  if (!article_id_hashed || !article_name || !article_type || !article_info || !article_short_description || !article_subtitle || !article_content)
    return responseHandler.badRequest(res, "Invalid article data");

  const articleID = decryptData(article_id_hashed);
  if (!articleID)
    return responseHandler.badRequest(res, "Invalid article ID");

  const query = { _id: articleID };

  try {
    const article = await Article.findOne(query);

    if (!article)
      return responseHandler.notFound(res, "Article not found!");

    // Update order_status, order_process_info
    await Article.findOneAndUpdate(query, {
      article_name,
      article_type,
      article_info,
      article_short_description,
      article_subtitle,
      article_content
    });

    return responseHandler.ok(res, null, "Updated");
  } catch (err) {
    console.log(err);
    next(err);
  }
}