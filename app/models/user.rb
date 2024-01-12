class User < ApplicationRecord
has_secure_password

validates :username,
  uniqueness: true,
  length: { in: 3..40 },
  format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
validates :email,
  uniqueness: true,
  length: { in: 3..100 },
  format: { with: URI::MailTo::EMAIL_REGEXP }
validates :session_token, presence: true, uniqueness: true
validates :password, length: { in: 6..40 }, allow_nil: true
validates :first_name, :last_name, presence: true

before_validation :ensure_session_token

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
