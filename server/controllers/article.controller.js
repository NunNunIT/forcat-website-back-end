import Article from '../models/article.model.js';
import resHandler from '../handlers/response.handler.js';
import { createSlug } from '../utils/createSlug.js';

const getSomeRelatedArticle = async ({ article_slug }) => {
  const numberLimitArticle = 5;
  const sortedFields = { createdAt: -1 };

  try {
    const articles = await Article.find({
      article_slug: { $ne: article_slug }, // Exclude the current article
    }, {
      _id: 0,
      article_short_description: 0,
      article_description: 0,
    }).limit(numberLimitArticle)
      .sort(sortedFields)
      .exec();

    return articles;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const create = async (req, res, next) => {
  try {
    const { article_name } = req.body;
    const article_slug = createSlug(article_name);
    const article = await Article.create({ ...req.body, article_slug });

    return resHandler.created(res, article);
  } catch (err) {
    if (err.code === 11000) {
      return resHandler.conflict(res, 'The article slug is already taken');
    }

    console.error(err);
    return resHandler.error();
  }
}

export const readAll = async (req, res, next) => {
  const pageNumber = (req.params.page > 0 ? req.params.page : 1);
  const numberLimitedArticle = (req.params.limit > 0 ? req.params.limit : 10);

  try {
    // Construct query object for filtering (if applicable)
    const query = {};

    const sorted_fields = {
      createdAt: -1,
    }

    // Perform efficient pagination with skip and limit
    const articles = await Article.find(query, { _id: 0, article_description: 0 })
      .skip((pageNumber - 1) * numberLimitedArticle) // Calculate skip based on page number
      .limit(numberLimitedArticle)
      .sort(sorted_fields) // Sort by creation date (optional)
      .exec(); // Execute the query

    return resHandler.ok(res, articles);
  } catch (err) {
    console.error(err);
    return resHandler.error();
  }
}

export const readOne = async (req, res, next) => {
  const query = {
    article_slug: req.params.slug,
  };

  try {
    const article = await Article.findOne(query, { _id: 0 }).exec();

    if (!article) {
      return resHandler.notFound(res, 'Not found the article with the article slug');
    }

    const relatedArticles = await getSomeRelatedArticle(article);
    article._doc.related_articles = relatedArticles;

    return resHandler.ok(res, article);
  } catch (err) {
    console.error(err);
    return resHandler.error();
  }
}

export const update = async (req, res, next) => {
  if (!req.params.slug) {
    return resHandler.badRequest(res, 'Missing the required data to perform this request');
  }

  const query = { article_slug: req.params.slug }
  const update = { ...req.body }

  try {
    const article = await Article.findOneAndUpdate(query, update).exec();

    if (!article) {
      return resHandler.notFound(res, 'Not found the article with the article slug');
    }

    return resHandler.ok(res, article);
  } catch (err) {
    console.error(err);
    return resHandler.error();
  }
}