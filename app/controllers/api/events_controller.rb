class Api::EventsController < ApplicationController


  def show
    @event = Event.find(params[:id])
    if @event
        render :show
    else
      render json: {event: nil}
    end
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render :show
    else
      render json: {errors: @event.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      render :show
    else
      render json: {errors: @event.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:id])

    if @event && @event.user_id == current_user.id
      @event.delete
      head :no_content
    end
  end

  def index
    @events = Event.all
    render :index
  end






  private
  def event_params
    params.require(:event).permit(:title, :description, :category, :price, :city, :date, :address, :start_time, :age_limit, :user_id)
  end

end
