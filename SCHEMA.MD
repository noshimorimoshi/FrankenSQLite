# Все покупки заказчика
```mermaid
classDiagram
    class Logins {
        <<table>>
        string origin_url
        string action_url
        string username_element
        string username_value
        string password_element
        blob password_value
        string submit_element
        string signon_realm
        int scheme
        int password_type
        blob possible_username_pairs
        int times_used
        blob form_data
        string display_name
        string icon_url
        string federation_url
        int blacklisted_by_user
        int skip_zero_click
        blob moving_blocked_for
        int generation_upload_status
        int date_created
        int date_last_used
        int date_password_modified
        string sender_email
        string sender_name
        int date_received
        int sharing_notification_displayed
        blob keychain_identifier
        string sender_profile_image_url
        int id (PK)
    }
```