class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, only: [:id, :name], include: {:pokemons => {only: [:id, :nickname, :species, :trainer_id]}}
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: trainer, only: [:id, :name], include: {:pokemons => {only: [:id, :nickname, :species, :trainer_id]}}
    end

end
