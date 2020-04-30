class CreateToDoDumps < ActiveRecord::Migration[6.0]
  def change
    create_table :to_do_dumps do |t|
	  t.integer   :task_id
      t.timestamps
    end
	
	
	add_foreign_key :to_do_dumps, :to_do_lists, column: :task_id, primary_key: :id
  
  end
    
end
