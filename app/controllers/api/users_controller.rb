class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  before_action :require_logged_out, only: [:create]

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
        login(@user)
        render :show
    else
        render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  private
  def user_params
      params.require(:user).permit(:email, :username, :password, :first_name, :last_name, :bio, :photo)
  end
end
