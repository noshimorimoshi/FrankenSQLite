```mermaid
erDiagram
    user_account {
        int id PK
        string username
        string password
        string email
        datetime created_at
        int default_shipping_address_id FK "Nullable: References address"
    }

    product {
        int id PK
        string keyword
        int wekan_task_id FK
        datetime created_at
        datetime updated_at
        int wekan_priority "Nullable: Priority from Wekan"
    }


    order {
        int id PK
        int user_account_id FK
        datetime order_date
        int status_id FK "References status"
        decimal total_amount
        int shipping_address_id FK "References address"
        int billing_address_id FK "Nullable: References address"
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
        decimal discount_amount "Nullable"
        string discount_description "Nullable"
    }

    basket {
        int id PK
        int user_account_id FK
        datetime created_at
        datetime updated_at
        decimal total_amount
        string strategy "Например: Для купона X, Сравнение с Market B, Плановый заказ (Nullable)"
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
        int assigned_to_user_account_id FK "Nullable: References user_account"
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
        decimal cashback_received "Nullable"
    }

    pay_method {
        int id PK
        string name
        int wallet_id FK "Nullable: References wallet"
        int currency_id FK "Nullable: References currency"
        string details "e.g., last 4 digits of card, phone number"
    }

    wallet {
        int id PK
        string name
        decimal balance "Nullable"
        int currency_id FK "Nullable: References currency"
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
        datetime delivered_at "Nullable"
        string tracking_number "Nullable"
        int status_id FK "References status"
        decimal shipping_cost
        int shipping_address_id FK "References address"
    }

    offer {
        int id PK
        int product_id FK
        string channel
        decimal price
        int status_id FK "References status"
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
        int breadcrumb_id FK "References breadcrumb"
        string brand
        text description
        string barcode "Nullable"
        string vendor_code "Nullable"
    }

    breadcrumb {
        int id PK
        int parent_id "Nullable: FK to self"
        string name
    }

    media {
        int id PK
        int catalog_id FK
        string type "CHECK('image', 'video', 'document')"
        string url
        string alt_text "Nullable"
        int sort_order "DEFAULT 0"
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

    web_service {
        int id PK
        string name
        string url "Nullable"
        string category "Nullable"
        boolean is_active
        boolean requires_auth
        string usage_quota "Nullable"
        int status_id FK "Nullable: References status"
        string type "e.g., marketplace, cashback, sms"
        decimal time_response "Nullable"
        decimal uptime "Nullable"
        datetime created_at
        datetime last_used_at "Nullable"
        decimal balance "Nullable"
        text api_key "Nullable"
        text cookie "Nullable"
        string last_used_ip "Nullable"
        datetime last_used_time "Nullable"
        int cashback_service_id FK "Nullable: References web_service"
        rating NUMERIC "Nullable"
        rating_justification TEXT "Nullable"
        last_rating_update TIMESTAMP "Nullable"
    }

    box {
        int id PK
        int user_account_id FK
        string name "Nullable"
        string type "Nullable"
        text details "Nullable"
        datetime created_at
        int address_id FK "Nullable: References address"
    }

    status {
        int id PK
        string name
        text description "Nullable"
        string type "e.g., order, shipment, return_dispute, queue, web_service"
    }

    login {
        int id PK
        string username "Nullable"
        string password "Nullable"
        string type "e.g., email, phone, username"
        int box_id FK "Nullable: Belongs to box"
        int web_service_id FK "Nullable: Associated service"
        string phone_number "Nullable"
        string email "Nullable"
    }

    address {
        int id PK
        string street
        string city
        string state_province "Nullable"
        string postal_code "Nullable"
        string country
        string building_apt "Nullable"
        string details "Nullable"
    }

    pipeline {
        int pipeline_id PK
        string entity_table
        int entity_id
        int status_id FK
        int priority
        datetime last_updated_at
        string notes "Nullable"
    }

    tracker {
        int log_id PK
        string entity_table
        int entity_id
        int status_from_id FK
        int status_to_id FK
        datetime changed_at
    }

    user_account ||--o{ order : places
    user_account ||--o{ basket : has
    user_account ||--o{ box : has
    user_account }o--|| address : has_default_shipping
    user_account ||--o{ basket_item : is_assigned_to

    product ||--o{ order_item : is_part_of
    product ||--o{ basket_item : is_in
    product ||--o{ competitor_price : has
    product ||--o{ offer : has_offer
    product ||--o{ catalog : has_entry
    product ||--o{ product_inventory : has_inventory

    order ||--o{ order_item : contains
    order ||--o{ payment : has
    order ||--o{ shipment : has
    order ||--|| status : has_status
    order ||--|| address : has_shipping_address
    order }o--|| address : has_billing_address

    basket ||--o{ basket_item : contains
    
    pipeline ||--|| product : tracks
    pipeline ||--|| status : has_status
    tracker ||--|| product : logs
    tracker ||--|| status : logs_from
    tracker ||--|| status : logs_to
```mermaid
erDiagram
    user_account {
        int id PK
        string username
        string password
        string email
        datetime created_at
        int default_shipping_address_id FK "Nullable: References address"
    }

    product {
        int id PK
        string keyword
        int wekan_task_id FK
        datetime created_at
        datetime updated_at
        int wekan_priority "Nullable: Priority from Wekan"
    }


    order {
        int id PK
        int user_account_id FK
        datetime order_date
        int status_id FK "References status"
        decimal total_amount
        int shipping_address_id FK "References address"
        int billing_address_id FK "Nullable: References address"
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
        decimal discount_amount "Nullable"
        string discount_description "Nullable"
    }

    basket {
        int id PK
        int user_account_id FK
        datetime created_at
        datetime updated_at
        decimal total_amount
        string strategy "Например: Для купона X, Сравнение с Market B, Плановый заказ (Nullable)"
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
        int assigned_to_user_account_id FK "Nullable: References user_account"
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
        decimal cashback_received "Nullable"
    }

    pay_method {
        int id PK
        string name
        int wallet_id FK "Nullable: References wallet"
        int currency_id FK "Nullable: References currency"
        string details "e.g., last 4 digits of card, phone number"
    }

    wallet {
        int id PK
        string name
        decimal balance "Nullable"
        int currency_id FK "Nullable: References currency"
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
        datetime delivered_at "Nullable"
        string tracking_number "Nullable"
        int status_id FK "References status"
        decimal shipping_cost
        int shipping_address_id FK "References address"
    }

    offer {
        int id PK
        int product_id FK
        string channel
        decimal price
        int status_id FK "References status"
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
        int breadcrumb_id FK "References breadcrumb"
        string brand
        text description
        string barcode "Nullable"
        string vendor_code "Nullable"
    }

    breadcrumb {
        int id PK
        int parent_id "Nullable: FK to self"
        string name
    }

    media {
        int id PK
        int catalog_id FK
        string type "CHECK('image', 'video', 'document')"
        string url
        string alt_text "Nullable"
        int sort_order "DEFAULT 0"
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

    web_service {
        int id PK
        string name
        string url "Nullable"
        string category "Nullable"
        boolean is_active
        boolean requires_auth
        string usage_quota "Nullable"
        int status_id FK "Nullable: References status"
        string type "e.g., marketplace, cashback, sms"
        decimal time_response "Nullable"
        decimal uptime "Nullable"
        datetime created_at
        datetime last_used_at "Nullable"
        decimal balance "Nullable"
        text api_key "Nullable"
        text cookie "Nullable"
        string last_used_ip "Nullable"
        datetime last_used_time "Nullable"
        int cashback_service_id FK "Nullable: References web_service"
        rating NUMERIC "Nullable"
        rating_justification TEXT "Nullable"
        last_rating_update TIMESTAMP "Nullable"
    }

    box {
        int id PK
        int user_account_id FK
        string name "Nullable"
        string type "Nullable"
        text details "Nullable"
        datetime created_at
        int address_id FK "Nullable: References address"
    }

    status {
        int id PK
        string name
        text description "Nullable"
        string type "e.g., order, shipment, return_dispute, queue, web_service"
    }

    login {
        int id PK
        string username "Nullable"
        string password "Nullable"
        string type "e.g., email, phone, username"
        int box_id FK "Nullable: Belongs to box"
        int web_service_id FK "Nullable: Associated service"
        string phone_number "Nullable"
        string email "Nullable"
    }

    address {
        int id PK
        string street
        string city
        string state_province "Nullable"
        string postal_code "Nullable"
        string country
        string building_apt "Nullable"
        string details "Nullable"
    }

    pipeline {
        int pipeline_id PK
        string entity_table
        int entity_id
        int status_id FK
        int priority
        datetime last_updated_at
        string notes "Nullable"
    }

    tracker {
        int log_id PK
        string entity_table
        int entity_id
        int status_from_id FK
        int status_to_id FK
        datetime changed_at
    }

    user_account ||--o{ order : places
    user_account ||--o{ basket : has
    user_account ||--o{ box : has
    user_account }o--|| address : has_default_shipping
    user_account ||--o{ basket_item : is_assigned_to

    product ||--o{ order_item : is_part_of
    product ||--o{ basket_item : is_in
    product ||--o{ competitor_price : has
    product ||--o{ offer : has_offer
    product ||--o{ catalog : has_entry
    product ||--o{ product_inventory : has_inventory

    order ||--o{ order_item : contains
    order ||--o{ payment : has
    order ||--o{ shipment : has
    order ||--|| status : has_status
    order ||--|| address : has_shipping_address
    order }o--|| address : has_billing_address

    basket ||--o{ basket_item : contains
    
    pipeline ||--|| product : tracks
    pipeline ||--|| status : has_status
    tracker ||--|| product : logs
    tracker ||--|| status : logs_from
    tracker ||--|| status : logs_to
