let fil = new Vue({
    el: "#main",
    data: {
        min_price: "",
        search_key: "",
        allItems: [
            { "id": 1, "title": "Lipstick", "desc": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.", "price": 99, "imgUrl": "https://www.themakeupstudio.co.za/wp-content/uploads/2016/01/kylie-products-5-150x150.jpeg", "createdOn": "2019-09-19 19:26:02" },
            { "id": 2, "title": "Makeup Brush", "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.", "price": 50, "imgUrl": "https://www.themakeupstudio.co.za/wp-content/uploads/2016/01/Makeup-Brush-150x150.jpg", "createdOn": "2020-03-01 14:52:15" },
            { "id": 3, "title": "Brow Powder", "desc": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.", "price": 60, "imgUrl": "https://www.themakeupstudio.co.za/wp-content/uploads/2016/01/kylie-products-2-150x150.jpeg", "createdOn": "2019-05-20 12:20:37" },
            { "id": 4, "title": "Glitter", "desc": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", "price": 90, "imgUrl": "https://www.themakeupstudio.co.za/wp-content/uploads/2016/01/12-Sep-Product-Shots-9-150x150.jpg", "createdOn": "2019-03-15 17:02:47" },
            { "id": 5, "title": "Foundation", "desc": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.", "price": 120, "imgUrl": "https://assets.reviews.com/uploads/2018/02/09065325/Product-Card-Stellar-2-for-Foundation-150x150.png", "createdOn": "2019-08-14 00:06:16" },
            { "id": 6, "title": "Cosmetics", "desc": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.", "price": 80, "imgUrl": "https://www.themakeupstudio.co.za/wp-content/uploads/2016/01/Kylie-Cosmetics-150x150.jpeg", "createdOn": "2019-11-07 04:08:14" },
            { "id": 7, "title": "Toner", "desc": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.", "price": 98, "imgUrl": "https://www.sephora.com/productimages/sku/s1850346-main-grid.jpg", "createdOn": "2019-04-14 23:02:22" },
            { "id": 8, "title": "Facial Mask", "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.", "price": 29, "imgUrl": "https://thumbs.dreamstime.com/t/woman-cloth-facial-mask-relax-young-isolated-blue-background-concept-skin-care-moisture-asian-beauty-46473311.jpg", "createdOn": "2019-08-04 17:23:14" },
            { "id": 9, "title": "Moisturizing Cream", "desc": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.", "price": 119, "imgUrl": "http://fresh-beauty.com.au/wp-content/uploads/2015/03/Clinique-Dramatically-Different-Moisturizing-Lotion-150x150.jpg", "createdOn": "2019-05-01 10:38:00" },
            { "id": 10, "title": "Cleanser", "desc": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", "price": 97, "imgUrl": "http://www.nylonpink.tv/wp-content/uploads/2017/05/Best-Japanese-Facial-Wash-Shiseido-Fitit-Perfect-Whip-Cleansing-Foam-150x150.jpg", "createdOn": "2019-11-12 05:16:56" }
        ]
    },
    computed: {
        filteredItems: function () {
            //assign initial values
            var items = this.allItems,
                min_price = Number(this.min_price),
                search_key = this.search_key;

            if (!min_price && !search_key) {
                return items;
            }
            if (search_key) {
                search_key = search_key.trim().toLowerCase();
            }
            if (min_price || search_key) {
                items = items.filter(function (item) {
                    if(item.title.toLowerCase().indexOf(search_key) !== -1) {
                       return (item.price >= min_price) ;
                    }
                })
            }
            return items;
        }
    }
});
