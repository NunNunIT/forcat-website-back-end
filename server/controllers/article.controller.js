import Article from "../models/article.model.js";
import resHandler from "../handlers/response.handler.js";
import { encryptData, decryptData } from "../utils/security.js";
import { parseRawHTML } from "../utils/parseRawHTML.js";

const hashArticleId = (article) => {
  article._doc.article_id_hashed = encryptData(article._doc._id);
  article._doc._id = undefined;
  return article;
}

const getSomeRelatedArticle = async ({ article_slug }) => {
  const numberLimitArticle = 6;
  const sortedFields = { createdAt: -1 };

  try {
    // TODO: Hiếu
    // Cải tiến khả năng xếp hạng bài tập như chức năng tìm kiếm sản phẩm
    // Cải thiện khả năng tìm kiếm bằng cách loại trừ bài viết hiện tại
    const articles = await Article.find({
      article_slug: { $ne: article_slug }, // Exclude the current article
    }, {
      article_content: 0,
    }).limit(numberLimitArticle)
      .sort(sortedFields)
      .exec();

    const handledArticles = articles.map(hashArticleId);

    return handledArticles;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const readUnlimited = async (req, res, next) => {
  try {
    const articles = await Article.find({}, { article_content: 0 }).exec();
    const handledArticles = articles.map(hashArticleId);

    return resHandler.ok(res, handledArticles);
  } catch (err) {
    next(err);
  }
}

export const readAll = async (req, res, next) => {
  const page = (req.query?.page > 0 ? req.query?.page : 1);
  const limit = (req.query?.limit > 0 ? req.query?.limit : 10);

  try {
    // Construct query object for filtering (if applicable)
    const query = {};

    const sorted_fields = { createdAt: -1, }

    // Count the total number of articles
    const maxPage = Math.ceil(await Article.countDocuments(query).exec() / limit);

    // Perform efficient pagination with skip and limit
    const articles = await Article.find(query, { article_content: 0 })
      .skip((page - 1) * limit) // Calculate skip based on page number
      .limit(limit)
      .sort(sorted_fields) // Sort by creation date (optional)
      .exec(); // Execute the query

    const handledArticles = articles.map(hashArticleId);

    return resHandler.ok(res, { articles: handledArticles, maxPage });
  } catch (err) {
    next(err);
  }
}

// [GET] /api/articles/:slug/:aid
export const readOne = async (req, res, next) => {
  const { aid, slug } = req.params;
  console.log(aid, slug);
  if (!aid || !slug) {
    console.log("Missing the required data to perform this request");
    return resHandler.badRequest(res, "Missing the required data to perform this request");
  }

  const query = {
    _id: decryptData(req.params?.aid),
    article_slug: req.params?.slug,
  };

  try {
    const article = await Article.findOne(query, { _id: 0 }).exec();

    if (!article) {
      return resHandler.notFound(res, "Not found the article with the article slug");
    }

    const relatedArticles = await getSomeRelatedArticle(article);
    article._doc.article_content = parseRawHTML(article.article_content);
    article._doc.related_articles = relatedArticles;

    return resHandler.ok(res, article);
  } catch (err) {
    next(err);
  }
}
