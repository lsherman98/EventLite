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
    @registration = Registration.find(params[:id])

    if @registration.update(registration_params)
      render '/api/users/show'
    end
  end

  def destroy
    @registration = Registration.find_by(id: params[:id])
    @user = User.find(@registration.user_id)
    if @registration
      @registration.destroy!
    end
    render '/api/users/show'
  end

  private
  def registration_params
    params.require(:registration).permit(:id, :user_id, :event_id, :quantity)
  end
end
