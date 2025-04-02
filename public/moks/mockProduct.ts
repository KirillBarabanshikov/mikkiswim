import type { Product } from "~/entities/product/model/Product";

export const mockProduct: Product = {
    id: 1,
    title: "Premium Swimwear",
    price: 89.99,
    oldPrice: 120.00,
    viewers: 1245,
    description: "High-quality swimwear made from sustainable materials, perfect for summer vacations.",
    images: [
        {
            id: 1,
            image: "https://example.com/images/swimwear1.jpg"
        },
        {
            id: 2,
            image: "https://example.com/images/swimwear2.jpg"
        }
    ],
    tags: [
        {
            id: 1,
            title: "New Arrival",
            color: "#FF5733"
        },
        {
            id: 2,
            title: "Sustainable",
            color: "#33FF57"
        }
    ],
    color: "Ocean Blue",
    reviews: [],
    sizes: [
        {
            id: 1,
            title: "XS",
            active: true,
            quantity: 1
        },
        {
            id: 2,
            title: "S",
            active: true,
            quantity: 1
        },
        {
            id: 3,
            title: "M",
            active: false,
            quantity: 1
        }
    ],
    marketplaceLinks: [
        {
            id: 1,
            image: "https://example.com/marketplaces/amazon.jpg",
            link: "https://amazon.com/our-product"
        }
    ],
    delivery: "3-5 business days",
    payments: "Credit Card, PayPal, Apple Pay",
    helpSizes: null,
    materials: "80% Recycled Nylon, 20% Spandex",
    care: [
        {
            id: 1,
            type: "washing",
            title: "Hand wash only"
        },
        {
            id: 2,
            type: "drying",
            title: "Lay flat to dry"
        }
    ],
    weight: 0.3,
    length: 30,
    width: 20,
    height: 5,
    quantity: 50,
    catalogs: [
        {
            id: 1,
            title: "Summer Collection",
            slug: "summer-collection"
        },
        {
            id: 2,
            title: "Eco-Friendly",
            slug: "eco-friendly"
        }
    ],
    combinations: []
};

