Всё выглядит неплохо. Однако для ручного ввода недостаточно удобно заполнять всё это. Рутина. Поэтому пока, хотелось бы, на примерах из кодовой базы, сделать что-то простое, сведя количество заполняемых данных до минимально возможного, полям create human readable namings (title, description), при этом сохранить возможность масштабирования в будущем, когда этот код будет заполнять приложение, вместо ручного ввода данных. Изучи весь воркфлоу на примере регистрации, формирования корзины и совершения заказа. Особенно важно то, что данные эти необходимы и достаточны для начала и возможно, что в перспективе будут нужны и остальные сущности из примеров в контексте. Поэтому и схемы и таблицы и прочее, должны быть гибкими, чтобы их можно было масштабировать в перспективе. SQL команды не нужны. README проекта не нужен. Только маркдаун файлы, разбитые по доменам, где будут схемы и таблицы:
#### pipeline  
+ queued: [75]
+ in_basket: [1]
+ ordered: []
+ shipped: []
+ received: []
+ completed: []
#### priority
#### weight
+ importance:
  + level_1: 1
  + level_2: 2
  + health: 5
  + money: 4
  + time: 3
+ urgency:
  + urgent_important: 5
  + non_urgent_important: 4
  + non_urgent_unimportant: 1
  + urgent_unimportant: 0
+ category:
  + iot: 1
  + category_01: 2
  + category_2: 1
  + category_96: 1
#### queue
#### product
6. 
    + name: Пневматическая быстроразъёмная муфта
    + url: https://aliexpress.ru/item/1005004135633297.html
    + model: PCF 6-04
    + price: ₽283
    + priority_tags: [health, money, time, non_urgent_important, category_96, category_01]
    + status_code: 1.3.0
    + status_description: Продавец потребовал отмены. Получено 100 баллов
    + alternative_sources: [avito.ru, wildberries.ru]
    + shipping_cost: 0
    + total_cost: 1
    + resale_price: 5
    + ebitda: 3
    + profit: 2
75. 
    + service_provider: hstock.com
    + order_number: 9380221
    + name: Mail.ru account
    + url: https://hstock.org/en/product/mailru-account-old-account-registration-method-auto-gender-mix-confirmation-via-sms-yes-9772a89d
    + download_id: 39
    + price: ₽1
    + status_code: 5.1.0
    + product_description: "Mail.ru account old account Registration method - Auto Gender - Mix. Confirmation via SMS - Yes"
    + product_details: "Time to open a dispute : 1 h. \n    Description \n    Mail.ru account old account \n    Account format \n    Login: Password \n    Characteristics \n    Gender:Mix. \n    Confirmation via SMS:Yes \n    File  \n    login, password"

#### order
+ order_id: 1
#### basket
+ service_provider: aliexpress.ru
#### box
+ storage_id: 00
    + credentials: i7poxopzyx@mail.ru
+ storage_id: 38
    + credentials: kaiyapromise09686@j7z.org:AKA999aka
+ storage_id: 39
    + login: mBL_8k6kOjOR:frink7575@mail.ru
    + product_id: 75
#### web-service
+ temp_mail:
+ plati_market:
+ sms_activate_guru:
+ hstock:
    + login_id: 7
    + balance: ₽52.98
+ fivesim:
+ backit:
    + login: (3-f{Y7;@52@O"zyx(;@cpTOAauiY(wa&I
    + storage_id: 00
    + balance: ₽0
    + pending: ₽1.68
+ aliexpress:
    + timestamp: "пятница 2 мая 07:55"
    + ip_address: 178.70.51.194
    + cashback_service: backit
    + login_id: 6
    + storage_id: 39
    + cookie: _ym_uid=1745556907911617079;tmr_lvidTS=1745556907106;cna=qwOSICKKhl8CAbJH1ilDw6+k;xman_us_t=l_source=aliexpress&sign=y&x_user=L3+1RkKfF7+4OYsGUw1Vc7nEwIgwnVnkM+vZ1FEOsr4=&ctoken=21a9rx_77xm7&x_lid=ru3613957667fiqaer;ali_apache_id=33.22.87.200.1745568762642.681067.2;_ym_isad=2;xman_us_f=x_locale=ru_RU&x_l=0&x_user=RU|User|mailru|ifm|6063872667&x_lid=ru3613957667fiqaer;aer_rh=727883420;_ym_d=1745556907;aer_abid=1ff3a16ce6e25236.1696f5a9b.a8baaa84d3d5ea1;tmr_detect=0%7C1745568743309;JSESSIONID=2C39CF8CB9816872FA6707FC0818B930;adrcid=AbbZBie7-1XJlNMUT_B96VA;xlly_s=1;aer_fe_userid=6063872667;tmr_lvid=7bb18374efcfadb2ca96c4e3a6812849;tfstk=gucS9NxZTDhqx6Imr3L45DuowmNFdDOaRwaKS2CPJ7F8OeirfMrULUqLvogFUuhI-6aKJDYuYUYqr4V39h-wQCuorawBE7x49e3YTyMEfRPEr4VhoWSEUV0lR7hTV2FKvIBY-oUR9Tepl-UaJWC8p_BADo4L9We82sEY8yzdyyEJlqE0JWEKvWQC2waAAouWrnKvRAYMU4qf96hbkzqtlPz0oja7Fldgc6UrGzw7X4l1ZtS_RAh_EcKVUuH_FgR1_lwGM9_bI6UfEETfK9fxzxD4sIBPK8U0oL8XlOkuer4bbETfK928orvylE6ZE;isg=BKCgCZoT3OiScmDs3wklSeEPcqhyqYRz8si6Dxqxd7tOFUA_wrlYA3ZnqSWVvjxL;_ga=GA1.2.331492562.1745556907;_gat_UA-164782000-1=1;_gid=GA1.2.484291356.1745556907;_ym_visorc=b;a_r_t_info=%7B%22name%22%3A%22%22%2C%22id%22%3A%22%22%2C%22chinaName%22%3A%22%22%2C%22referralUrl%22%3A%22https%3A%2F%2Faliexpress.ru%2F%22%7D;a_t_info=%7B%22name%22%3A%22homepage%22%2C%22id%22%3A%22ec0826b1-2267-4b4c-bf0a-4192c67be74a%22%2C%22chinaName%22%3A%22home%22%2C%22referralUrl%22%3A%22https%3A%2F%2Faliexpress.ru%2F%22%7D;acs_3=%7B%22hash%22%3A%221aa3f9523ee6c2690cb34fc702d4143056487c0d%22%2C%22nst%22%3A1745643309473%2C%22sl%22%3A%7B%22224%22%3A1745556909473%2C%221228%22%3A1745556909473%7D%7D;adrdel=1745556909189;ae_ru_pp_v=1.0.2;aep_common_f=MLd8UJH8nvAenG+M478K4I8SUW+xDOvlcir2ejeKTj0Bd1EoNcmhtQ==;aep_usuc_f=b_locale=ru_RU&c_tp=RUB&region=RU&site=rus&province=917483800000000000&city=917483808380000000;aep_usuc_t=ber_l=A1;aer_auth_track_info=hTHcOIfRPGK24MQIaIpI+I7wveKUP8FHOfDOT2QqC8rJnppE6uRDa9xwRKGJPbc+v1FkpUyljZfdjW2ww2ZmUwoaTHFhEdoR4LAF+MaIFNcTj1i7eP/iT//L19jhGB3M6sAuFB13yIhyfL9xo9l+ew==;aer_ec=t2ZeDeIIuwkK8PObj7llpfXFR6NP6NUbSEYJzphbjhw96LD5T/eU2hBhy8lrskA36GxDYpIFrCM0e/hH5icHn/qrwdu14yiO3dydXLmCRNk=;aer_fe_loginid=ru3613957667fiqaer;aer_userid=6063872667;autoRegion=lastGeoUpdate=1745556903&regionCode=917483800000000000&cityCode=917483808380000000&countryCode=RU&postalCode=191181&latitude=59.9417&longitude=30.3096;domain_sid=KeqKUh4u7WJ64SFeLe6Pq%3A1745556909123;intl_common_forever=GyjbFVtA7QlqradvLj8OV359YW1COPUkVYxR21daOFtpu3FuvyDGDA==;x_aer_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhZXJfbGFzdG5hbWUiOiJtYWlscnUiLCJhZXJfdG9rZW5fdHlwZSI6IldFQl9BQ0NFU1MiLCJzdWIiOiI2MDYzODcyNjY3IiwiYWVyX2NvdW50cnkiOiJSVSIsImFlcl9maXJzdG5hbWUiOiJVc2VyIiwiaXNzIjoiQWxpRXhwcmVzcyBSVVNTSUEiLCJleHAiOjE3NjEzMzY2ODEsImFlcl91c2VyX2JlbG9uZyI6IkxPQ0FMIiwiaWF0IjoxNzQ1NTY4NjgxLCJqdGkiOiI4NGFjMDVlYy1kMjhmLTRkZTMtYjYxZi04Y2RkYWI2YWNhZTMiLCJzaWQiOiIyZTg2YmU1OS03OWVlLTQzNTctYjZlYi05NjJmMTJhOWZiNzMifQ.N50sQTYUe5T1--yl-NKz8SX6Rhf_Da4W8adfJSLl0TciF4esv30BgE42EZcmMQfXRlcaQP1XCf_Y4o_AmhkR_A;xman_f=xwzl42XyQEjvBi/13X7p8jQgNn8x30stqlnb2f4EBPbcoUjijMhV4COsMtSPBhQkbJhyefXyeZQy0/GXV6EoumwXD1gIXb8tBGBwy0Nf/2Yfn1nznQCGQxCYy1/xc3TuGaAQObS0D7N42go9QXUHJy3qo1NosT32guBoUHW/TtSRaCOpTx04LgsS/g79px6cFvGyLNpoffwqz+4iq92QGQSUxe79QmQpM7ZEsZm2k16A/05U0Wws/bxl+l44Bvqf1XiX0mKQ/R/B5KjENUB1aR973EUDFTlzcZCumLqsak2hWGNrhJ2ISOklhly6CGGyaOev6MvRTAOhD0jmSKs7lUgM1QB0L+QbnyFd6iX8D1YubTfOq95B9alRQmDEqJt2UpWNsc8iVB8=;xman_t=vETEwnW3Bv595wxNi7vaMXN7gY9JCLv//hOrHTveaCfjysYpiT9s+o5nXcsJiuZ74E/eLNUe/kA8JCS3c8b1p+rodifLewVmmOCZn/oR/IWgoqzyZRbrQ1Jy1P5cH2Ge6rzTL6gUGKGuoGI2YqllClBY5c2I2RDbd6i+0UVZMi6GZjGTPhXMFHMGFfsSJ5uioIlE1+5KLMEa1rCvE6FhkBQr9UdIyulJmAYvea89UmhKa27G53gIMObbhVVzLUpJ6buQdwUWQ0Cbi5ctxB3YBlQbJhruA+MFhwvI57VuLnuymoRZIX5DV+2K4ohbnQ9twHiyygFWDG4zoj6oURorc2CWet1k3pFq2SNhIBWwCCCLLEBx34LiqPLfVnW+CZd5IJ4YeP1dwLBonnh/xw5rstKZ9osVoMCJZ5HEFZAXWr+i/l2qIC6gr/36lnRsFCqiUlrGOlDQ/6yHYxVXxqPZSExvlOpwvL/7J3ZyLaH2NMO7JBmIze/PJAKle48PX1/jT8ZM5sqJtGIBWk5cccVO1i+jeaVufwaqQ9kmBOzt3d5jo+9iqWjZ35Gh1NT/qJgAUtBEvgp+Td6rS7o6QdP6DvPzpJoHSiXO0OUVFjj8VM446C7P1UI/YnqufKHqNBwKWbIdPT54dCzovav2BvBHNqHeiuuPUL8MMD2Xt7eASzcjxk6ya2kWh7BWOFcpJMbB3ypy9DII2nY=
    + pay method: 
            SBP
            virtual card:
                pochta_bank:
                    login: login
                    password: password
                    phone: phone
                    card_number: …2553:04:28:…
                        balance: ₽1500
                        для маркетплейса: aliexpress
                        usage_count: 1
                        usage_limit: 5
                yoomoney:
                tinkoff_bank:
                etc…
            etc…
        phone number:
            fivesim:
                login: 2ua7ogmzyxvjc6d@mail.ru
                password: 2Ua7ogmzyxvjc6d@
                balance: ₽11.00
                api_key: eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzcyNzg2ODMsImlhdCI6MTc0NTc0MjY4MywicmF5IjoiM2NhMmY1NGRhOGY4ZDZlOTFlNmNmMDU3ODA0OTllNDEiLCJzdWIiOjE3MDc3NzV9.VuEw-V52fHGI-pqVeeEkVS4IL_AcNiQAE9Mwh0IrjeWvs2l2kIvWebfNXj3wjnEob7QlvrulFBE82HrYELWyx-9ZRLyUcprfKPZo_tvr2FlKqoyYrH-tLdodrNbGIell3F_xygr6WZRbtaV4W0tXYcGw3OimKHvuFPqnx_WpbFuuXGnU7HchaaM4lYT1QaqeYYJPXr-d6ZZwKNXnMvIqJDq1AzJHhgvTFxFNIy7zahcm1jUGzyx64G2UQP-7nk-9PABFsCl6Q-NK29QyvSQgT3biWqQOWAalRXot9hdKe9gOIG61HNUV_2dcrzGP3JcC4OHVbFmXPHkEMinD0A3BWlqyw
                user_id: 1707775
            sms_activate_guru:
            etc…
        track №umber: 
#### login_accounts
+ account_id: 0
  + type: phone
+ account_id: 1
  + type: yandex
+ account_id: 2
  + type: vkontakte
+ account_id: 3
  + type: odnoklassniki
+ account_id: 4
  + type: google
+ account_id: 5
  + type: mail_ru
+ account_id: 6
  + type: sms_activate_guru

#### status_codes:
+ order_creation:
  + new_order: 1.0.0
  + ordered_unpaid: 1.1.0 
  + ordered_paid: 1.2.0
  + cancelled: 1.3.0
  + purchased_elsewhere: 1.4.0
  + order_rejected: 1.5.0
  + wrong_item_ordered: 1.6.0
  + test_order: 1.7.0
  + postponed: 1.8.0
+ order_processing:
  + preparation: 2.0.0
  + packed: 2.1.0
  + shipped: 2.2.0
  + address_changed: 2.3.0
+ transit:
  + in_transit: 3.0.0
  + arrived_to_country: 3.1.0
  + customs_check: 3.2.0
  + passed_customs: 3.3.0
+ local_delivery:
  + in_delivery: 4.0.0
  + at_pickup_point: 4.1.0
  + delivery_failed: 4.2.0
+ final_statuses:
  + delivered: 5.0.0
  + not_received: 5.1.0
  + partially_received: 5.1.1
  + partially_lost: 5.1.2
  + partially_not_ordered: 5.1.3
  + lost: 5.2.0
  + damaged: 5.3.0
  + wrong_item: 5.5.0
  + test_order_approved: 5.6.0
  + test_order_rejected: 5.7.0
+ returns_disputes:
  + dispute_opened: 6.0.0
  + awaiting_resolution: 6.1.0
  + returned: 6.2.0
  + return_confirmed: 6.3.0
  + refunded: 6.4.0

конечная цена товара или субститут у конкурентов: avito, auchan, lenta, ozon, wildberries, 2.taobao, 1688, ebay, amazon, etc…
стоимость доставки
конечная стоимость покупки

конечная стоимость продажи
ebitda
выручка
чистая прибыль
