class Foto < ActiveRecord::Base

belongs_to :fotoeable, :polymorphic => true

  has_attached_file :image,
  :styles => {
      :icon => ["64x64#", :jpg],
      :original => ["980x576>", :jpg]
  },
  :url => "/uploads/:style/:basename.:extension",
  :path => ":rails_root/public/uploads/:style/:basename.:extension"

end
