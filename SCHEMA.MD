classDiagram
    class user_account {
        id : int (PK)
        email : string (UNIQUE)
        password_hash : string
        full_name : string
        created_at : date
    }

    class product {
        id : int (PK)
        name : string
        description : string
        base_price : float # Базовая цена товара
        cost_price : float # Себестоимость товара
    }

    class competitor_price {
        id : int (PK)
        product_id : int (FK)
        competitor_name : string # Название конкурента (например, Avito, Ozon)
        price : float # Цена у конкурента
        url : string # Ссылка на товар у конкурента (опционально)
        last_updated : date # Дата последнего обновления цены
    }

    class basket {
        id : int (PK)
        user_id : int (FK) # Ссылка на пользователя ([[user_account]])
        created_at : date # Дата создания корзины
        updated_at : date # Дата последнего обновления корзины
        status : string # Статус корзины (черновик, активна, оформлена)
        total_price : float # Сумма всех товаров в корзине
        total_weight : float # Общий вес товаров в корзине
    }

    class basket_item {
        id : int (PK)
        basket_id : int (FK) # Ссылка на корзину ([[basket]])
        product_id : int (FK) # Ссылка на товар ([[product]])
        quantity : int # Количество товара в позиции корзины (было qty)
        price_at_add : float # Цена за единицу на момент добавления в корзину (было price)
        discount : float # Скидка (может быть суммой или процентом, пока float)
    }

    class order {
        id : int (PK)
        user_account_id : int (FK) # Ссылка на пользователя
        basket_id : int (FK) # Ссылка на корзину, из которой создан заказ
        created_at : date # Дата и время создания заказа
        status : string # Статус заказа
        payment_method : string # Метод оплаты (пока string, возможно станет FK)
        total_price : float # Конечная стоимость покупки (общая сумма заказа)
        shipping_cost : float # Стоимость доставки
        shipping_address : string # Адрес доставки
    }

    class order_item {
        id : int (PK)
        order_id : int (FK) # Ссылка на заказ ([[order]])
        product_id : int (FK) # Ссылка на товар ([[product]])
        quantity : int # Количество товара
        price_per_unit : float # Цена за единицу на момент продажи
        cost_price_per_unit : float # Себестоимость за единицу на момент продажи
    }

    user_account "1" -- "*" basket : has
    user_account "1" -- "*" order : places

    basket "1" -- "*" basket_item : contains
    product "1" -- "*" basket_item : appears_in

    basket "1" -- "1" order : converted_to # Корзина конвертируется в заказ

    order "1" -- "*" order_item : contains
    product "1" -- "*" order_item : appears_in

    product "1" -- "*" competitor_price : has