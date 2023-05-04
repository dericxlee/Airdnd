# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#  birthdate       :date             not null
#
class User < ApplicationRecord
    has_secure_password

    validates :email, 
        length: { in: 4..24}, 
        uniqueness: true,
        format: { with: URI::MailTo::EMAIL_REGEXP }
    
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :birthdate, presence: true

    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 4..16 }, allow_nil: true

    validate :validate_age

    before_validation :ensure_session_token

    has_many :listings,
    foreign_key: :host_id,
    class_name: :Listing

    has_many :trips,
    foreign_key: :user_id,
    class_name: :Trip

    has_many :reviews,
    foreign_key: :user_id,
    class_name: :Review

    has_one_attached :photo

    def validate_age
        if birthdate.present? && birthdate > 18.years.ago.to_date
            errors.add(:base, 'Users must be over 18 years old')
        end
    end

    def self.find_by_credentials(email, password)
        # field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
        user = User.find_by(email: email)
        user&.authenticate(password)
    end

    def reset_session_token
        self.update!(session_token: generate_session_token)
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

    private

    def generate_session_token
        loop do
            token = SecureRandom::urlsafe_base64(16)
            return token unless User.exists?(session_token: token)
        end
    end
end
