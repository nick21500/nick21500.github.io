var app = new Vue({
    el: '#app',
    data: {
        drawer: false,
        pages: ["Products", "Cart", "Product Info"],
        currentPage: "Products",
        products: [
            {
                name: "Raspberry Pi 3",
                vendor: "Raspberry Pi",
                plus: true,
                details: [
                    "An appropriate amount of RAM",
                    "All the ports you could need",
                    "Bluetooth connectivity!"
                ],
                selectedVariant: 0,
                displayPrice: 34.48,
                displayImage: "assets/img/pi-10.jpg",
                variants: [
                    {
                        variantId: 10,
                        variantName: "Model B",
                        variantImage: "assets/img/pi-10.jpg",
                        variantPrice: 34.48,
                        variantStock: 100
                    },
                    {
                        variantId: 11,
                        variantName: "Model B+",
                        variantImage: "assets/img/pi-11.jpg",
                        variantPrice: 38.50,
                        variantStock: 100
                    }
                ],
                reviews: [

                ]
            },
            {
                name: "Bose SoundLink Wireless Headphones",
                vendor: "Bose",
                plus: true,
                details: [
                    "Deep, immersive, body-thumpin\', foot-tappin\' sound",
                    "(Up to) 15 hours of play time on a single charge",
                    "Bluetooth connectivity!"
                ],
                selectedVariant: 0,
                displayPrice: 229.00,
                displayImage: "assets/img/hp-20.jpg",
                variants: [
                    {
                        variantId: 20,
                        variantName: "Black",
                        variantImage: "assets/img/hp-20.jpg",
                        variantPrice: 229.00,
                        variantStock: 100
                    },
                    {
                        variantId: 21,
                        variantName: "White",
                        variantImage: "assets/img/hp-21.jpg",
                        variantPrice: 229.00,
                        variantStock: 100
                    }
                ],
                reviews: [

                ]
            },
            {
                name: "DEWALT 12\" Sliding Compound Miter Saw",
                vendor: "DEWALT",
                plus: false,
                details: [
                    "Powerful 3800 RPM motor for all of your sawing needs",
                    "Dust Collection System collects 75% of the sawdust",
                    "Bluetooth connecti- wait no"
                ],
                selectedVariant: 0,
                displayPrice: 349.00,
                displayImage: "assets/img/ms-30.jpg",
                variants: [

                ],
                reviews: [

                ]
            }
        ]
    },
    methods: {
        changePage(targetPage) {
            this.currentPage = targetPage;
            this.drawer = false;
        }
    },
    computed: {
        /*price(index) {
            return this.products[index].variants[this.products[index].selectedVariant].variantPrice;
        }*/
        image(indx) {
            return this.products[indx].variants[this.products[indx].selectedVariant].variantImage;
        }
    }
});

app.$vuetify.theme.primary = '#B71C1C';
app.$vuetify.theme.secondary = '#ff5722';
app.$vuetify.theme.accent = '#ff9800';
app.$vuetify.theme.error = '#673ab7';
app.$vuetify.theme.warning = '#9c27b0';
app.$vuetify.theme.info = '#3f51b5';
app.$vuetify.theme.success = '#607d8b';

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img src="image">
            </div>
            <div class="product-info">
                <h1>{{selectedProduct.name}}</h1>
                <p v-if="stock > 10">In Stock</p>
                <p v-else-if="stock <= 10 && stock > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>

                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     :style="{backgroundColor: variant.variantColor}"
                     @mouseover="updateProduct(index)"
                >
                </div>

                <button @click="addToCart"
                        :disabled="stock == 0"
                        :class="{disabledButton: stock == 0}"
                >
                    Add to Cart
                </button>
            </div>
                
        </div>
    `,
    data(){
        return {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            details: [
                "80% Cotton",
                "20% Polyester",
                "Unisex"
            ],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "assets/img/socks-green.jpg",
                    variantStock: 60
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "assets/img/socks-blue.jpg",
                    variantStock: 0
                }
            ],
            reviews: []
        }
    },
    methods: {
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        stock() {
            return this.variants[this.selectedVariant].variantStock;
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99;
            }
        },
        selectedProduct() {
            if (this.id0) {
                return app.products[0]
            } else if (this.id1) {
                return app.products[1]
            } else if (this.id2) {
                return app.products[2]
            }
        }
    },
    mounted() {

    }
})