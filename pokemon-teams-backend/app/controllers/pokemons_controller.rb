class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        trainer = Trainer.find_by(id: params[:trainer_id])
        render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
    end

    def create
        trainer = Trainer.find( params[:trainer_id])
        if trainer.pokemons.length < 6 
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            render json: pokemon
        else
          render json: {message: "Only 6 pokemons per team. Please release one before adding another."}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

end
