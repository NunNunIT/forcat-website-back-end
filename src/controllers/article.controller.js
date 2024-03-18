const { ArticleModel } = require('../models')

const articleController = () => { }

articleController.readAll = async (req, res, next) => {
  const pageNumber = (req.param.page > 0 ? req.param.page : 1);
  const numberLimitedArticle = 10;

  try {
    // Construct query object for filtering (if applicable)
    const query = {};
    // Add filtering criteria based on your requirements (e.g., req.query.category)

    // Perform efficient pagination with skip and limit
    const articles = await ArticleModel.find(query, 'article_id article_type article_short_description article_info article_date')
      .skip((pageNumber - 1) * numberLimitedArticle) // Calculate skip based on page number
      .limit(numberLimitedArticle)
      .sort({ _id: -1 }) // Sort by creation date (optional)
      .exec(); // Execute the query

    return res.status(200).json({
      statusCode: 200,
      msg: 'Successful',
      data: articles
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Error Server',
      msg: 'An error occurred during find all accounts',
    })
  }
}

// articleController.read = 

module.exports = articleController;