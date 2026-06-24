# Database Plan

## Main Tables

### profiles
Stores user profile information connected to Supabase Auth.

Fields:
- id
- full_name
- email
- global_role
- created_at

### businesses
Stores Alma's businesses.

Fields:
- id
- name
- slug
- created_at

Examples:
- Alianza
- Petra Insurance

### business_members
Controls which users belong to which business.

Fields:
- id
- business_id
- user_id
- role
- status
- created_at

### clients
Stores client/customer records.

Fields:
- id
- business_id
- assigned_to
- name
- phone
- email
- status
- notes
- created_at

### tasks
Stores employee tasks and follow-ups.

Fields:
- id
- business_id
- client_id
- assigned_to
- title
- description
- status
- due_date
- created_at

### documents
Stores document records.

Fields:
- id
- business_id
- client_id
- uploaded_by
- file_name
- file_url
- document_type
- created_at

### activity_logs
Tracks important activity.

Fields:
- id
- business_id
- user_id
- action
- details
- created_at

## Security Plan
Use Supabase RLS.

Rule:
Users can only see records from businesses they are members of.

Exception:
Alma as super_admin can see everything.
