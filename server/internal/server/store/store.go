package store

import (
	"context"
	"fmt"
	"github.com/wrporter/games/server/internal/env"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Store interface {
	SaveUser(user User) (primitive.ObjectID, error)
	GetUserByEmail(email string) (User, error)
}

type MongoStore struct {
	client *mongo.Client
}

func New() Store {
	clientOptions := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:27017", env.MongoHost))
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		env.RequireNoErr(err)
	}
	return &MongoStore{client}
}
