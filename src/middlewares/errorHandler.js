const errorHandler= (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred. Please try again later';

  console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode} -${message}}`)

  if (err.stack) {
    console.log(err.stack)
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...err(process.env.NODE_ENV ==='development'&& {stack: err.stack})
  })
}

module.exports = errorHandler;