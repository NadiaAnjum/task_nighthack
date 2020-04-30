class CreateToDoLists < ActiveRecord::Migration[6.0]
  def change
    create_table :to_do_lists do |t|
      t.string :email_id
      t.string :task
      t.string :description
      t.string :start_date
      t.string :end_date
      t.string :comments
	  t.string :assigned_to
      t.string :status, :default => 'Active'
      t.timestamps
    end
  end
end
