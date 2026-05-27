package prometheus

import (
	"context"
	"time"

	v1 "github.com/prometheus/client_golang/api/prometheus/v1"

	"github.com/prometheus/client_golang/api"
)

type Client struct {
	API v1.API
}

func NewPrometheusClient() (*Client, error) {

	client, err := api.NewClient(api.Config{
		Address: "http://localhost:9090",
	})

	if err != nil {
		return nil, err
	}

	return &Client{
		API: v1.NewAPI(client),
	}, nil
}

func (c *Client) QueryRange(
	query string,
) (interface{}, error) {

	r := v1.Range{
		Start: time.Now().Add(-1 * time.Hour),
		End:   time.Now(),
		Step:  time.Minute,
	}

	result, _, err := c.API.QueryRange(
		context.Background(),
		query,
		r,
	)

	if err != nil {
		return nil, err
	}

	return result, nil
}