const { ArticleModel } = require("../models")
const slugify = require("slugify");

const articleController = () => { }

const getSomeRelateArticle = async ({ article_slug, article_date, article_type }) => {
  const numberLimitArticle = 5;

  console.log(article_slug, article_date, article_type);
  try {
    const articles = await ArticleModel.find({
      article_slug: { $ne: article_slug }, // Exclude the current article
      $or: [
        { article_type: article_type }, // Prioritize articles with the same type
        { article_type: { $ne: article_type } } // Fallback for other types if needed
      ]
    }, {
      _id: 0,
      article_slug: 0,
      article_short_description: 0,
      article_description: 0,
    }).limit(numberLimitArticle);

    return articles;
  } catch (err) {
    console.error(err);
    return null;
  }
}

articleController.create = async (req, res, next) => {
  try {
    const { article_name } = req.body;
    const article_slug = slugify(article_name, {
      replacement: "-",  // replace spaces with -
      locale: "vi",
      remove: /[*+~.()'"!:@]/g, // remove characters mentioned in the regex pattern
      lower: true  // convert to lowercase
    })
    const article = await ArticleModel.create({ ...req.body, article_slug });

    return res.status(201).json({
      statusCode: 201,
      msg: "Create successful",
      data: article,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        statusCode: 409,
        err: "Conflict",
        msg: "Article slug already exists"
      })
    }

    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: "Internal Error Server",
      msg: "An error occurred during create the article"
    })
  }
}

articleController.readAll = async (req, res, next) => {
  const pageNumber = (req.params.page > 0 ? req.params.page : 1);
  const numberLimitedArticle = (req.params.limit > 0 ? req.params.limit : 10);

  try {
    // Construct query object for filtering (if applicable)
    const query = {};

    const sorted_fields = {
      article_date: -1,
    }

    // Perform efficient pagination with skip and limit
    const articles = await ArticleModel.find(query, { _id: 0, article_description: 0 })
      .skip((pageNumber - 1) * numberLimitedArticle) // Calculate skip based on page number
      .limit(numberLimitedArticle)
      .sort(sorted_fields) // Sort by creation date (optional)
      .exec(); // Execute the query

    return res.status(200).json({
      statusCode: 200,
      msg: "Successful",
      data: articles
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: "Internal Error Server",
      msg: "An error occurred during find all articles",
    })
  }
}

articleController.read = async (req, res, next) => {
  const query = {
    article_slug: req.params.slug,
  };

  try {
    const article = await ArticleModel.findOne(query, { _id: 0 }).exec();

    if (!article) {
      return res.status(404).json({
        statusCode: 404,
        err: "Not found",
        msg: "Not found the article with your article_slug"
      })
    }

    // article.relate_articles = await getSomeRelateArticle(article);
    const relatedArticles = await getSomeRelateArticle(article);
    console.log(relatedArticles);
    // const new_article = { ...article, relatedArticles }
    article._doc.related_articles = relatedArticles;

    return res.status(200).json({
      statusCode: 200,
      msg: "Successful",
      data: article,
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: "Internal Error Server",
      msg: "An error occurred during find the article",
    })
  }
}

articleController.update = async (req, res, next) => {
  if (!req.params.slug) {
    return res.status(400).json({
      statusCode: 400,
      err: "Bad request",
      msg: "Missing the required data to perform this request"
    })
  }

  const query = { article_slug: req.params.slug }
  const update = { ...req.body }

  try {
    const article = await ArticleModel.findOneAndUpdate(query, update).exec();

    if (!article) {
      return res.status(404).json({
        statusCode: 404,
        err: "Not founded",
        msg: "Not found the article with the article slug"
      })
    }

    return res.status(200).json({
      statusCode: 200,
      msg: "Update successful",
      data: article,
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: "Internal Error Server",
      msg: "An error occurred during find the article"
    })
  }
}


module.exports = articleController;