create table departments (
	id int primary key auto_increment,
	parent_id int null,
	name varchar(50) not null,
	root_name varchar(50) generated always as (
		case
			when parent_id is null then name
			else null
		end
	) stored,
	sort_order int not null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,

	constraint fk_department_in_departments
		foreign key (parent_id) references departments(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;

create unique index uq_departments_parent_name
on departments(parent_id, name);

create unique index uq_departments_root_name
on departments(root_name);


create table categories (
	id int primary key auto_increment,
	parent_id int null,
	name varchar(50) not null,
	root_name varchar(50) generated always as (
		case
			when parent_id is null then name
			else null
		end
	) stored,
	sort_order int not null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,

	constraint fk_category_in_categories
		foreign key (parent_id) references categories(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;

create unique index uq_categories_parent_name
on categories(parent_id, name);

create unique index uq_categories_root_name
on categories(root_name);


create table roles (
	id int primary key auto_increment,
	name varchar(25) not null,
	sort_order int not null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,

	constraint uq_roles_name unique (name)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table users (
	id int primary key auto_increment,
	name varchar(50) not null,
	surname varchar(100) not null,
	email varchar(255) not null,
	password_hash varchar(255) not null,
	role_id int not null,
	department_id int null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,
	last_login_at datetime(6) null,

	constraint fk_role_in_users
		foreign key (role_id) references roles(id),

	constraint fk_department_in_users
		foreign key (department_id) references departments(id),

	constraint uq_users_email unique (email)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table statuses (
	id int primary key auto_increment,
	code varchar(50) not null,
	name varchar(50) not null,
	sort_order int not null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,

	constraint uq_statuses_code unique (code),
	constraint uq_statuses_name unique (name)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table priorities (
	id int primary key auto_increment,
	code varchar(50) not null,
	name varchar(25) not null,
	sort_order int not null,
	is_active tinyint(1) not null default 1,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,

	constraint uq_priorities_code unique (code),
	constraint uq_priorities_name unique (name)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table tickets (
	id int primary key auto_increment,
	requestor_id int not null,
	department_id int null,
	agent_id int null,
	title varchar(100) not null,
	description text null,
	category_id int null,
	status_id int not null,
	priority_id int not null,
	created_at datetime(6) not null default current_timestamp(6),
	assigned_at datetime(6) null,
	updated_at datetime(6) null,
	resolved_at datetime(6) null,
	closed_at datetime(6) null,

	constraint fk_user_as_requestor_in_tickets
		foreign key (requestor_id) references users(id),

	constraint fk_department_in_tickets
		foreign key (department_id) references departments(id),

	constraint fk_user_as_agent_in_tickets
		foreign key (agent_id) references users(id),

	constraint fk_category_in_tickets
		foreign key (category_id) references categories(id),

	constraint fk_status_in_tickets
		foreign key (status_id) references statuses(id),

	constraint fk_priority_in_tickets
		foreign key (priority_id) references priorities(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table comments (
	id int primary key auto_increment,
	ticket_id int not null,
	user_id int not null,
	`comment` text not null,
	is_internal tinyint(1) not null default 0,
	created_at datetime(6) not null default current_timestamp(6),
	updated_at datetime(6) null,
	deleted_at datetime(6) null,

	constraint fk_ticket_in_comments
		foreign key (ticket_id) references tickets(id),

	constraint fk_user_in_comments
		foreign key (user_id) references users(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table ticket_attachments (
	id int primary key auto_increment,
	ticket_id int not null,
	uploaded_by int not null,
	file_name varchar(255) not null,
	file_path varchar(1000) not null,
	content_type varchar(100) null,
	file_size_bytes bigint null,
	created_at datetime(6) not null default current_timestamp(6),
	is_deleted tinyint(1) not null default 0,
	deleted_at datetime(6) null,
	deleted_by int null,

	constraint fk_ticket_in_ticket_attachments
		foreign key (ticket_id) references tickets(id),

	constraint fk_user_in_ticket_attachments
		foreign key (uploaded_by) references users(id),

	constraint fk_deleted_by_in_ticket_attachments
		foreign key (deleted_by) references users(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table ticket_ratings (
	id int primary key auto_increment,
	ticket_id int not null,
	user_id int not null,
	rating tinyint not null,
	`comment` text null,
	created_at datetime(6) not null default current_timestamp(6),

	constraint fk_ticket_in_ticket_ratings
		foreign key (ticket_id) references tickets(id),

	constraint fk_user_in_ticket_ratings
		foreign key (user_id) references users(id),

	constraint chk_ticket_ratings_rating
		check (rating between 1 and 5)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create table tickets_history (
	id int primary key auto_increment,
	ticket_id int not null,

	requestor_id int not null,
	department_id int null,
	agent_id int null,

	title varchar(100) not null,
	description text null,
	category_id int null,
	status_id int not null,
	priority_id int not null,

	created_at datetime(6) not null,
	assigned_at datetime(6) null,
	updated_at datetime(6) null,
	resolved_at datetime(6) null,
	closed_at datetime(6) null,

	changed_by int null,
	history_created_at datetime(6) not null default current_timestamp(6),

	constraint fk_ticket_in_tickets_history
		foreign key (ticket_id) references tickets(id),

	constraint fk_user_as_requestor_in_tickets_history
		foreign key (requestor_id) references users(id),

	constraint fk_department_in_tickets_history
		foreign key (department_id) references departments(id),

	constraint fk_user_as_agent_in_tickets_history
		foreign key (agent_id) references users(id),

	constraint fk_category_in_tickets_history
		foreign key (category_id) references categories(id),

	constraint fk_status_in_tickets_history
		foreign key (status_id) references statuses(id),

	constraint fk_priority_in_tickets_history
		foreign key (priority_id) references priorities(id),

	constraint fk_changed_by_in_tickets_history
		foreign key (changed_by) references users(id)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_polish_ci;


create or replace view v_tickets as
select
	t.id,
	t.title as ticket_title,
	t.description as ticket_description,

	ur.id as requestor_id,
	ur.name as requestor_name,
	ur.surname as requestor_surname,
	ur.email as requestor_email,

	t.department_id,
	d.name as department_name,

	ua.id as agent_id,
	ua.name as agent_name,
	ua.surname as agent_surname,
	ua.email as agent_email,

	t.category_id,
	c.name as category_name,

	t.status_id,
	s.code as status_code,
	s.name as status_name,

	t.priority_id,
	p.code as priority_code,
	p.name as priority_name,

	t.created_at,
	t.assigned_at,
	t.updated_at,
	t.resolved_at,
	t.closed_at
from tickets as t
left join users as ur
	on t.requestor_id = ur.id
left join departments as d
	on t.department_id = d.id
left join users as ua
	on t.agent_id = ua.id
left join categories as c
	on t.category_id = c.id
left join statuses as s
	on t.status_id = s.id
left join priorities as p
	on t.priority_id = p.id;


create or replace view v_comments as
select
	c.id,
	c.ticket_id,
	c.user_id,
	u.name as user_name,
	u.surname as user_surname,
	u.email as user_email,
	c.`comment`,
	c.is_internal,
	c.created_at,
	c.updated_at
from comments as c
left join users as u
	on c.user_id = u.id
where c.deleted_at is null;


insert into roles
	(name, sort_order)
values
	('Admin', 0),
	('Agent', 1),
	('Requestor', 2);


insert into statuses
	(code, name, sort_order)
values
	('new', 'Nowe', 0),
	('in_progress', 'W toku', 1),
	('waiting_for_requestor', 'Oczekuje na zgłaszającego', 2),
	('waiting_for_team', 'Oczekuje na zespół', 3),
	('on_hold', 'Wstrzymane', 4),
	('resolved', 'Rozwiązane', 5),
	('closed', 'Zamknięte', 6);


insert into priorities
	(code, name, sort_order)
values
	('none', 'Brak', 0),
	('low', 'Niski', 1),
	('medium', 'Średni', 2),
	('high', 'Wysoki', 3),
	('critical', 'Krytyczny', 4);


create index ix_tickets_requestor_id 
on tickets(requestor_id);

create index ix_tickets_agent_id 
on tickets(agent_id);

create index ix_tickets_department_id 
on tickets(department_id);

create index ix_tickets_category_id 
on tickets(category_id);

create index ix_tickets_status_id 
on tickets(status_id);

create index ix_tickets_priority_id 
on tickets(priority_id);

create index ix_tickets_created_at 
on tickets(created_at);

create index ix_comments_ticket_id 
on comments(ticket_id);

create index ix_comments_user_id 
on comments(user_id);

create index ix_ticket_attachments_ticket_id 
on ticket_attachments(ticket_id);

create index ix_tickets_history_ticket_id 
on tickets_history(ticket_id);

create index ix_tickets_history_history_created_at 
on tickets_history(history_created_at);

create index ix_tickets_status_agent_created
on tickets(status_id, agent_id, created_at);

create index ix_tickets_requestor_created
on tickets(requestor_id, created_at desc);

create index ix_tickets_department_status_created
on tickets(department_id, status_id, created_at desc);