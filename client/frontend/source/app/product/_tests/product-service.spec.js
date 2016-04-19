describe('app.product.productService', function () {
  var productService, httpBackend;
  var apiUrl = 'http://private-a8bc9-fashionshop.apiary-mock.com/api/';
  var products = [
  {
    id: 1,
    title: "Handledsskydd med tumme",
    brand: "RESORT",
    price: 250.00,
    raiting: 0.00,
    images: [
			{
			  url: "http://backontrack.com/media/catalog/product/cache/7/image/945x/9df78eab33525d08d6e5fb8d27136e95/1/3/1310_wrist-brace-with-thumb_3.jpg",
			  thumbnail: "http://backontrack.com/media/catalog/product/cache/7/small_image/160x200/9df78eab33525d08d6e5fb8d27136e95/1/3/1310_wrist-brace-with-thumb_3.jpg",
			  type: "primary"
			},
			{
			  url: "http://az392967.vo.msecnd.net/product-image/142234955815913681-product-list-large.jpg",
			  thumbnail: "http://az392967.vo.msecnd.net/product-image/142234955815913681-halens-product-tiny.jpg",
			  type: "model"
			},
			{
			  url: "http://lorempixel.com/945/945/",
			  thumbnail: "http://lorempixel.com/160/200/",
			  type: "detail"
			}
    ],
    sizes: ["36 (UK8)", "38 (UK10)", "40 (UK12)", "42 (UK14)", "44 (UK16)", "46 (UK18)"],
    colors: ["Black", "Yellow"]
  },
	{
	  id: 2,
	  title: "Knäskydd Per4mance",
	  brand: "RESORT",
	  price: 349.00,
	  raiting: 0.00,
	  images: [
			{
			  url: "http://backontrack.com/media/catalog/product/cache/7/image/945x/9df78eab33525d08d6e5fb8d27136e95/1/1/1105_knee_brace_performance_2_2.jp",
			  thumbnail: "http://backontrack.com/media/catalog/product/cache/7/small_image/160x200/9df78eab33525d08d6e5fb8d27136e95/1/1/1105_knee_brace_performance_2_2.jp",
			  type: "primary"
			},
			{
			  url: "http://az392967.vo.msecnd.net/product-image/142234955815913681-product-list-large.jpg",
			  thumbnail: "http://az392967.vo.msecnd.net/product-image/142234955815913681-halens-product-tiny.jpg",
			  type: "model"
			},
			{
			  url: "http://lorempixel.com/945/945/",
			  thumbnail: "http://lorempixel.com/160/200/",
			  type: "detail"
			}
	  ],
	  sizes: ["36 (UK8)", "38 (UK10)", "40 (UK12)", "42 (UK14)", "44 (UK16)", "46 (UK18)"],
	  colors: ["Black", "Yellow"]
	}];
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {
    productService = $injector.get('app.product.productService');
    httpBackend = $injector.get('$httpBackend');
    httpBackend.whenGET(apiUrl + 'products').respond(products);
  }));
  describe('getListProducts', function () {
    beforeEach(inject(function () {
    }));
    it('should return correct length', inject(function () {
      productService.getListProducts().then(function (data) {
        expect(data.length).toBe(2);
      });
      httpBackend.flush();
    }));
    it('should return correct display', inject(function () {
      productService.getListProducts().then(function (data) {
        var primaryImage = _.find(data[0].images, { 'type': 'primary' });
        expect(data[0].imageDisplay).toBe(primaryImage);
        expect(data[0].displayColor).toBe("Black Yellow");
        expect(data[0].displaySize).toBe("36 (UK8) 38 (UK10) 40 (UK12) 42 (UK14) 44 (UK16) 46 (UK18)");
      });
      httpBackend.flush();
    }));
  });
  describe('setActiveImage', function () {
    beforeEach(inject(function () {
    }));
    it('should active image', inject(function () {
      productService.getListProducts().then(function (data) {
        var product = data[0];
        var activeImage = product.images[1];
        productService.setActiveImage(product, activeImage);
        expect(activeImage.active).toBe(true);
      });
      httpBackend.flush();
    }));
    it('should return when active same image', inject(function () {
      productService.getListProducts().then(function (data) {
        var product = data[0];
        var ativeImage = product.images[0];
        var orderActiveImage = product.images[1];
        ativeImage.active = true;
        orderActiveImage.active = true;
        productService.setActiveImage(product, ativeImage);
        expect(ativeImage.active).toBe(true);
        expect(orderActiveImage.active).toBe(true);
      });
      httpBackend.flush();
    }));
    it('should un-active all image except active image', inject(function () {
      productService.getListProducts().then(function (data) {
        var product = data[0];
        var ativeImage = product.images[0];
        var orderActiveImage = product.images[1];
        var unActiveImage = product.images[2];
        ativeImage.active = true;
        orderActiveImage.active = true;
        unActiveImage.active = false;
        productService.setActiveImage(product, unActiveImage);
        expect(unActiveImage.active).toBe(true);
        expect(ativeImage.active).toBe(false);
        expect(orderActiveImage.active).toBe(false);
      });
      httpBackend.flush();
    }));
  });
});