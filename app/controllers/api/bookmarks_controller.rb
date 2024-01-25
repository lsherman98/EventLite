class Api::BookmarksController < ApplicationController
  def create
    @bookmark = Bookmark.create(bookmark_params)
    @bookmark.save!
    @event = Event.find_by(id: @bookmark.event_id)
    render '/api/events/show'
  end

  def destroy
    @bookmark = Bookmark.find_by(event_id: params[:event_id], user_id: params[:user_id])
    @event = Event.find(params[:event_id])
    if @bookmark
      @bookmark.destroy!
      render '/api/events/show'
    end
  end


  private
  def bookmark_params
    params.require(:bookmark).permit(:user_id, :event_id)
  end
end
