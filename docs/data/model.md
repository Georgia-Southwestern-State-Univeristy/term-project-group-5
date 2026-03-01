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
        attribute_ids array string
    }

    DESTINATION {
        id string PK
        name string
        country string
        description string
        image_url string
        attributes array string
    }

    ATTRIBUTE {
        id string PK
        label string "e.g., 'Cheap', 'Beach', 'Quiet'"
        type string
    }


    %%FK = Foreign Key, PK = Primary Key, refers. = references


%% SIMPLIFICATIONS/ASSUMPTIONS
%%Purposefully simplifying the country attribute in Destination instead of making a new table to avoid complex joins.

%%We are treating all attributes as equal when we could implement logic to require one selection per type.

%%If a user enters a search request that was acquired from a saved request, a whole new request will be put in instead of updating the exiswting one.

%%Images could be saved in the database, but we are choosing to just return a url.

%%We are only allowing one image per destination to avoid adding another tanble linking destination to multiple images.

```
