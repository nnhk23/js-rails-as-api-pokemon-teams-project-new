class PokemonsController < ApplicationController

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

end
