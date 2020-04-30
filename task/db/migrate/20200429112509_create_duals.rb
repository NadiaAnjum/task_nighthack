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
	SQL


  end
end
