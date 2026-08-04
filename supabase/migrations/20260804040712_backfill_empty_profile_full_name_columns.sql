update profiles p
set full_name = u.raw_user_meta_data ->> 'name'
from auth.users u
where p.id = u.id and p.full_name is null;