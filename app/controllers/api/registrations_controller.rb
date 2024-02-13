class Api::RegistrationsController < ApplicationController

  def create
    @registration = Registration.new(registration_params)
    @user = User.find(@registration.user_id)
    @event = Event.find_by(id: @registration.event_id)
    if @user
      @registration.save!
    end
    render '/api/users/show'
  end

  def update
    @registration = Registration.find_by(user_id: params[:user_id], event_id: params[:event_id])
    if @registration.update(registration_params)
      # render json: { message: ['registration updated'] }, status: 200
      @user = User.find(@registration.user_id)
      render '/api/users/show'
    end
  end

  def destroy
    @registration = Registration.find_by(id: params[:id])
    if @registration
      @registration.destroy!
    end
    @user = User.find(@registration.user_id)
    render '/api/users/show'
  end

  private
  def registration_params
    params.require(:registration).permit(:id, :user_id, :event_id, :quantity)
  end
end
