class CreateDuals < ActiveRecord::Migration[6.0]
  def change
    create_table :duals, id: false do |t|
      t.string :tmp, primary_key: true

    end

    execute <<-SQL
        	alter table duals
        	add constraint duals_check CHECK (tmp::text = 'abcdiskkllaksjksdjhdskasjdhkf'::text);
    
    	
		--data section


		INSERT INTO duals (tmp) VALUES ('abcdiskkllaksjksdjhdskasjdhkf');
		
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (1, 'a@gmail.com', 'Planning', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (2, 'a@gmail.com', 'Preparation', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (3, 'a@gmail.com', 'Task a', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (4, 'a@gmail.com', 'Task b', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (5, 'a@gmail.com', 'Task c', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (6, 'a@gmail.com', 'Task d', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (7, 'a@gmail.com', 'Task e', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (8, 'a@gmail.com', 'Task f', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (9, 'a@gmail.com', 'Task g', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (10, 'a@gmail.com', 'Paperwork', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (11, 'a@gmail.com', 'Hand-off', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		INSERT INTO public.to_do_lists(id, email_id, task, created_at, updated_at) VALUES (12, 'a@gmail.com', 'Follow up', '2019-04-12 12:54:31.082946', '2019-04-12 12:54:31.082946');
		
		SELECT pg_catalog.setval('public.to_do_lists_id_seq', 12, true);
	SQL


  end
end
