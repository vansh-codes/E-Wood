## PRE-Requisites

#### Install VS-Code Extension

- Name: Draw.io Integration
- Id: hediet.vscode-drawio
- Description: This unofficial extension integrates Draw.io into VS Code.
- Version: 1.6.6
- Publisher: Henning Dieterichs
- VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio

## MermaidJS code for DFD's

### Level 0 DFD
:::mermaid
graph TD
    User[User] -->|Interacts| System[E-Commerce System]
    System -->|Provides| ProductsDatabase[Product Database]
    System -->|Provides| Orders[Order Management]
    System -->|Provides| Cart[Cart Management]
    System -->|Provides| Wishlist[Wishlist Management]
:::

### Level 1 DFD

:::mermaid
graph TD
    User[User]
    ProductsDatabase[Product Database]
    Orders[Order Management]
    Cart[Cart Management]
    Wishlist[Wishlist Management]
    Settings[Settings Management]

    User -->|Browse| Products[Product Browsing]
    Products --> ProductsDatabase

    User -->|Add to Wishlist| WishlistManagement[Wishlist Management]
    WishlistManagement --> Wishlist

    User -->|Add to Cart| CartManagement[Cart Management]
    CartManagement --> Cart

    User -->|Checkout| Checkout[Checkout and Payment]
    Checkout --> Orders

    User -->|Update| Settings

    Orders -->|Track| OrderTracking[Order Tracking]

:::

### Level 2 DFD

:::mermaid
graph TD
    subgraph ProductBrowsing
        A1[User Initiates Product Browsing] --> A2[Filter/Sort Products]
        A2 --> A3[Search Products]
        A3 --> A4[Display Product Details]
    end

    subgraph WishlistManagement
        B1[User Adds Item to Wishlist] --> B2[Check Product Availability]
        B2 --> B3[Update Wishlist]
        B3 --> B4[Save to Wishlist Data Store]
    end

    subgraph CartManagement
        C1[User Adds Item to Cart] --> C2[Update Cart Items]
        C2 --> C3[Calculate Total]
        C3 --> C4[Save to Cart Data Store]
    end

    subgraph Checkout
        D1[User Proceeds to Checkout] --> D2[Calculate Total]
        D2 --> D3[Apply Discounts/Coupons]
        D3 --> D4[Process Payment]
        D4 --> D5[Save Order to Order Data Store]
    end

    subgraph OrderTracking
        E1[User Views Order Status] --> E2[Retrieve Order Data]
        E2 --> E3[Display Order Status]
    end
:::

### Level 3 DFD

:::mermaid
graph TD
    D1[User Initiates Checkout] --> D2[Verify Cart Contents]
    D2 --> D3[Calculate Cart Total]
    D3 --> D4[Apply User-Specific Discounts]
    D4 --> D5[Process Payment Method Selection]
    D5 --> D6[Validate Payment Details]
    D6 --> D7[Process Payment]
    D7 --> D8[Save Order Details]
    D8 --> D9[Generate Order Confirmation]
    D9 -->|Sends Confirmation| User
    D8 -->|Save| OrderData[Order Data Store]
:::