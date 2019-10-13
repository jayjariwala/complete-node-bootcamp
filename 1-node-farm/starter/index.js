const fs = require('fs');
const url = require('url');
const http = require('http');

// manipulate product data
const getProductsHtml = (template, product) => {
  return (output = template
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%ORGANIC%}/g, product.organic === true ? 'organic' : '')
    .replace(/{%ID%}/g, product.id)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%DESCRIPTION%}/g, product.description));
};

// Read files
const overview = fs.readFileSync(
  __dirname + '/templates/overview.html',
  'utf-8'
);
const displayProduct = fs.readFileSync(
  __dirname + '/templates/displayProduct.html',
  'utf-8'
);
const products = JSON.parse(
  fs.readFileSync(__dirname + '/dev-data/data.json', 'utf-8')
);
const productTemplate = fs.readFileSync(
  __dirname + '/templates/product.html',
  'utf-8'
);
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html'
    });

    const productsHtml = products
      .map(product => {
        return getProductsHtml(displayProduct, product);
      })
      .join('');

    res.end(overview.replace(/{%PRODUCT_CONTAINER%}/g, productsHtml));
  } else if (pathname === '/product') {
    const product = products[query.id];
    const output = getProductsHtml(productTemplate, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(products);
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'page-not-found': '404'
    });
    res.end('<h1>Page Not Found!<h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('The server is running on port 8000');
});
