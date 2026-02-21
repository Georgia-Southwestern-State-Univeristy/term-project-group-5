```mermaid
erDiagram
    
    USER ||--o{ SEARCH_REQUEST : "submits"
    
    SEARCH_REQUEST ||--o{ REQUEST_CRITERIA : "contains"
    REQUEST_CRITERIA }o--|| ATTRIBUTE : "selected"
    
    DESTINATION ||--o{ DESTINATION_ATTRIBUTE : "has"
    DESTINATION_ATTRIBUTE }o--|| ATTRIBUTE : "defines"

    USER {
        id UUID PK
        email string
        created_at datetime
        password_hash string
    }

    SEARCH_REQUEST {
        id string PK
        user_id UUID FK "refers. USER.id"
        created_at datetime
    }

    DESTINATION {
        id string PK
        name string
        country string
        description string
        image_url string
    }

    ATTRIBUTE {
        id string PK
        label string "e.g., 'Cheap', 'Beach', 'Quiet'"
    }

    DESTINATION_ATTRIBUTE {
        destination_id string FK "refers. DESTINATION.id"
        attribute_id string FK "refers. ATTRIBUTE.id"
    }

    REQUEST_CRITERIA {
        request_id string FK "refers. SEARCH_REQUEST.id"
        attribute_id string FK "refers. ATTRIBUTE.id"
    }
    ```
    %%FK = Foreign Key, PK = Primary Key, refers. = references