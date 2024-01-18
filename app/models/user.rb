class User < ApplicationRecord
has_secure_password

validates :username,
  uniqueness: true,
  length: { in: 3..40, message:  "Username must be between 3 & 40 characters in length"},
  format: { without: URI::MailTo::EMAIL_REGEXP, message:  "Can't be an email" }
validates :email,
  uniqueness: true,
  length: { in: 3..100 },
  format: { with: URI::MailTo::EMAIL_REGEXP, message:  "Please provide a valid email address" }
validates :session_token, presence: true, uniqueness: true
validates :password, length: { in: 6..40, message:  "Password must be between 6 & 40 characters in length" }, allow_nil: true
validates :first_name, :last_name, presence: true

before_validation :ensure_session_token

has_many :organized_events,
  foreign_key: :user_id,
  class_name: :Event


has_many :bookmarks
has_many :bookmarked_events, through: :bookmarks, source: :event

has_many :registrations
has_many :registered_events, through: :registrations, source: :event




def ensure_session_token
  self.session_token ||= generate_session_token
end

def reset_session_token!
  self.update!(session_token: generate_session_token)
  self.session_token
end

def self.find_by_credentials(credential, password)
  field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
  user = User.find_by(field => credential)
  user&.authenticate(password)
end

private

def generate_session_token
    while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
    end
end
end
