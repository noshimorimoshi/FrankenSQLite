```mermaid
erDiagram
    user_account {
        int id PK
        string username
        string password
        string email
        datetime created_at
    }

    product {
        int id PK
        string name
        text description
        decimal price
        datetime created_at
        datetime updated_at
    }

    order {
        int id PK
        int user_account_id FK
        datetime order_date
        int status_id FK "References status"
        decimal total_amount
    }

    order_item {
        int id PK
        int order_id FK
        int product_id FK
        int qty
        decimal price_per_item
        decimal subtotal
        decimal cost_of_goods_sold
        decimal sale_price
    }

    basket {
        int id PK
        int user_account_id FK
        datetime created_at
        datetime updated_at
        decimal total_amount
    }

    basket_item {
        int id PK
        int basket_id FK
        int product_id FK
        int qty
        datetime added_at
        decimal price_at_add
        decimal subtotal
        int queue_id FK "Nullable: Origin from queue"
    }

    competitor_price {
        int id PK
        int product_id FK
        string competitor_name
        decimal price
        datetime recorded_at
    }

    payment {
        int id PK
        int order_id FK
        int pay_method_id FK "References pay_method"
        datetime paid_at
        decimal amount
    }

    pay_method {
        int id PK
        string name
        int wallet_id FK "References wallet"
        int currency_id FK "References currency"
    }

    wallet {
        int id PK
        string name
    }

    currency {
        int id PK
        string code
        string name
    }

    shipment {
        int id PK
        int order_id FK
        datetime shipped_at
        datetime delivered_at
        string tracking_number
        int status_id FK "References status"
        decimal shipping_cost
    }

    offer {
        int id PK
        int product_id FK
        string channel
        decimal price
        string status
        boolean available
        decimal acquisition_cost
    }

    catalog {
        int id PK
        int product_id FK
        string name
        string url
        string model
        decimal cost
        string category
        string brand
        text description
        string barcode
        string vendor_code
    }

    product_inventory {
        int id PK
        int product_id FK
        int warehouse_id FK
        int stock_qty
        int reserved_qty
        string location
    }

    warehouse {
        int id PK
        string name
    }

    queue {
        int id PK
        int product_id FK
        string priority
        string status
        datetime created_at
        int assigned_to_user_account_id FK "Assigned user"
        string type
        text note
    }

    web_service {
        int id PK
        string name
        string url
        string category
        boolean is_active
        boolean requires_auth
        string usage_quota
        int status_id FK "References status, Nullable"
        string priority
        string type
        decimal time_response
        decimal uptime
        datetime created_at
        datetime last_used_at
        decimal balance
        text api_key "Nullable"
        text cookie "Nullable"
        string last_used_ip "Nullable"
        datetime last_used_time "Nullable"
        int cashback_service_id FK "References web_service, Nullable"
    }

    box {
        int id PK
        int user_account_id FK
        string name
        string type
        text details
        datetime created_at
    }

    status {
        int id PK
        string name
        text description
        string type "e.g., order, shipment, web_service"
    }

    login {
        int id PK
        string username
        string password
        string type "e.g., email, phone, username"
        int box_id FK "Belongs to box"
        int web_service_id FK "Nullable: Associated service"
    }

    user_account ||--o{ order : places
    user_account ||--o{ basket : has
    user_account ||--o{ queue : assigned_to
    user_account ||--o{ box : has
    order ||--o{ order_item : contains
    order ||--o{ payment : has
    order ||--o{ shipment : has
    order ||--o{ status : has_status
    product ||--o{ order_item : is_part_of
    product ||--o{ basket_item : is_in
    product ||--o{ competitor_price : has
    product ||--o{ offer : has_offer
    product ||--o{ catalog : has_entry
    product ||--o{ product_inventory : has_inventory
    product ||--o{ queue : is_queued
    basket ||--o{ basket_item : contains
    pay_method ||--o{ payment : used_for
    wallet ||--o{ pay_method : linked_to
    currency ||--o{ pay_method : uses
    shipment ||--o{ status : has_status
    warehouse ||--o{ product_inventory : stores
    queue ||--o{ basket_item : becomes_item
    box ||--o{ login : contains
    web_service ||--o{ login : associated_with
    web_service }o--|| web_service : offers_cashback
```