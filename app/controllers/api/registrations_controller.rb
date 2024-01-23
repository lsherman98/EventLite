class Api::RegistrationsController < ApplicationController
  def create
    @registration = Registration.new(registration_params)
    @user = User.find_by(params[:user_id])
    @event = Event.find_by(id: @registration.event_id)
    if @user
      @registration.save!
    end
    render '/api/events/show'
  end

  def destroy
    @registration = Registration.find_by(id: params[:id])
    if @registration
      @registration.destroy!
    end
  end

  private
  def registration_params
    params.require(:registration).permit(:user_id, :event_id, :quantity)
  end
end
