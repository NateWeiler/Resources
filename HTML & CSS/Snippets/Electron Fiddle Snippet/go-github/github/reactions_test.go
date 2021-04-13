// Copyright 2016 The go-github AUTHORS. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package github

import (
	"context"
	"fmt"
	"net/http"
	"reflect"
	"testing"
)

func TestReaction_Marshal(t *testing.T) {
	testJSONMarshal(t, &Reaction{}, "{}")

	r := &Reaction{
		ID:      Int64(1),
		User:    nil,
		NodeID:  String("n"),
		Content: String("+1"),
	}

	want := `{
		"id": 1,
		"node_id": "n",
		"content": "+1"
	}`

	testJSONMarshal(t, r, want)
}

func TestReactions_Marshal(t *testing.T) {
	testJSONMarshal(t, &Reactions{}, "{}")

	r := &Reactions{
		TotalCount: Int(1),
		PlusOne:    Int(1),
		MinusOne:   Int(1),
		Laugh:      Int(1),
		Confused:   Int(1),
		Heart:      Int(1),
		Hooray:     Int(1),
		Rocket:     Int(1),
		Eyes:       Int(1),
		URL:        String("u"),
	}

	want := `{
		"total_count": 1,
		"+1": 1,
		"-1": 1,
		"laugh": 1,
		"confused": 1,
		"heart": 1,
		"hooray": 1,
		"rocket": 1,
		"eyes": 1,		
		"url": "u"
	}`

	testJSONMarshal(t, r, want)
}

func TestReactionsService_ListCommentReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		testFormValues(t, r, values{"content": "+1"})
		fmt.Fprint(w, `[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`)
	})

	opt := &ListCommentReactionOptions{Content: "+1"}
	ctx := context.Background()
	reactions, _, err := client.Reactions.ListCommentReactions(ctx, "o", "r", 1, opt)
	if err != nil {
		t.Errorf("ListCommentReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(reactions, want) {
		t.Errorf("ListCommentReactions = %+v, want %+v", reactions, want)
	}
}

func TestReactionsService_CreateCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreateCommentReaction(ctx, "o", "r", 1, "+1")
	if err != nil {
		t.Errorf("CreateCommentReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreateCommentReaction = %+v, want %+v", got, want)
	}
}

func TestReactionsService_ListIssueReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.ListIssueReactions(ctx, "o", "r", 1, nil)
	if err != nil {
		t.Errorf("ListIssueReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("ListIssueReactions = %+v, want %+v", got, want)
	}
}

func TestReactionsService_CreateIssueReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreateIssueReaction(ctx, "o", "r", 1, "+1")
	if err != nil {
		t.Errorf("CreateIssueReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreateIssueReaction = %+v, want %+v", got, want)
	}
}

func TestReactionsService_ListIssueCommentReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.ListIssueCommentReactions(ctx, "o", "r", 1, nil)
	if err != nil {
		t.Errorf("ListIssueCommentReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("ListIssueCommentReactions = %+v, want %+v", got, want)
	}
}

func TestReactionsService_CreateIssueCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreateIssueCommentReaction(ctx, "o", "r", 1, "+1")
	if err != nil {
		t.Errorf("CreateIssueCommentReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreateIssueCommentReaction = %+v, want %+v", got, want)
	}
}

func TestReactionsService_ListPullRequestCommentReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/pulls/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.ListPullRequestCommentReactions(ctx, "o", "r", 1, nil)
	if err != nil {
		t.Errorf("ListPullRequestCommentReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("ListPullRequestCommentReactions = %+v, want %+v", got, want)
	}
}

func TestReactionsService_CreatePullRequestCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/pulls/comments/1/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreatePullRequestCommentReaction(ctx, "o", "r", 1, "+1")
	if err != nil {
		t.Errorf("CreatePullRequestCommentReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreatePullRequestCommentReaction = %+v, want %+v", got, want)
	}
}

func TestReactionsService_ListTeamDiscussionReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/teams/1/discussions/2/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.ListTeamDiscussionReactions(ctx, 1, 2, nil)
	if err != nil {
		t.Errorf("ListTeamDiscussionReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("ListTeamDiscussionReactions = %+v, want %+v", got, want)
	}
}

func TestReactionsService_CreateTeamDiscussionReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/teams/1/discussions/2/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreateTeamDiscussionReaction(ctx, 1, 2, "+1")
	if err != nil {
		t.Errorf("CreateTeamDiscussionReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreateTeamDiscussionReaction = %+v, want %+v", got, want)
	}
}

func TestReactionService_ListTeamDiscussionCommentReactions(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/teams/1/discussions/2/comments/3/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "GET")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[{"id":1,"user":{"login":"l","id":2},"content":"+1"}]`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.ListTeamDiscussionCommentReactions(ctx, 1, 2, 3, nil)
	if err != nil {
		t.Errorf("ListTeamDiscussionCommentReactions returned error: %v", err)
	}
	want := []*Reaction{{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("ListTeamDiscussionCommentReactions = %+v, want %+v", got, want)
	}
}

func TestReactionService_CreateTeamDiscussionCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/teams/1/discussions/2/comments/3/reactions", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "POST")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(`{"id":1,"user":{"login":"l","id":2},"content":"+1"}`))
	})

	ctx := context.Background()
	got, _, err := client.Reactions.CreateTeamDiscussionCommentReaction(ctx, 1, 2, 3, "+1")
	if err != nil {
		t.Errorf("CreateTeamDiscussionCommentReaction returned error: %v", err)
	}
	want := &Reaction{ID: Int64(1), User: &User{Login: String("l"), ID: Int64(2)}, Content: String("+1")}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("CreateTeamDiscussionCommentReaction = %+v, want %+v", got, want)
	}
}

func TestReactionsService_DeleteCommitCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/comments/1/reactions/2", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteCommentReaction(ctx, "o", "r", 1, 2); err != nil {
		t.Errorf("DeleteCommentReaction returned error: %v", err)
	}
}

func TestReactionsService_DeleteCommitCommentReactionByRepoID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repositories/1/comments/2/reactions/3", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteCommentReactionByID(ctx, 1, 2, 3); err != nil {
		t.Errorf("DeleteCommentReactionByRepoID returned error: %v", err)
	}
}

func TestReactionsService_DeleteIssueReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/1/reactions/2", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteIssueReaction(ctx, "o", "r", 1, 2); err != nil {
		t.Errorf("DeleteIssueReaction returned error: %v", err)
	}
}

func TestReactionsService_DeleteIssueReactionByRepoID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repositories/1/issues/2/reactions/3", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteIssueReactionByID(ctx, 1, 2, 3); err != nil {
		t.Errorf("DeleteIssueReactionByRepoID returned error: %v", err)
	}
}

func TestReactionsService_DeleteIssueCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/issues/comments/1/reactions/2", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteIssueCommentReaction(ctx, "o", "r", 1, 2); err != nil {
		t.Errorf("DeleteIssueCommentReaction returned error: %v", err)
	}
}

func TestReactionsService_DeleteIssueCommentReactionByRepoID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repositories/1/issues/comments/2/reactions/3", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteIssueCommentReactionByID(ctx, 1, 2, 3); err != nil {
		t.Errorf("DeleteIssueCommentReactionByRepoID returned error: %v", err)
	}
}

func TestReactionsService_DeletePullRequestCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repos/o/r/pulls/comments/1/reactions/2", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeletePullRequestCommentReaction(ctx, "o", "r", 1, 2); err != nil {
		t.Errorf("DeletePullRequestCommentReaction returned error: %v", err)
	}
}

func TestReactionsService_DeletePullRequestCommentReactionByRepoID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/repositories/1/pulls/comments/2/reactions/3", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeletePullRequestCommentReactionByID(ctx, 1, 2, 3); err != nil {
		t.Errorf("DeletePullRequestCommentReactionByRepoID returned error: %v", err)
	}
}

func TestReactionsService_DeleteTeamDiscussionReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/orgs/o/teams/s/discussions/1/reactions/2", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteTeamDiscussionReaction(ctx, "o", "s", 1, 2); err != nil {
		t.Errorf("DeleteTeamDiscussionReaction returned error: %v", err)
	}
}

func TestReactionsService_DeleteTeamDiscussionReactionByTeamIDAndOrgID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/organizations/1/team/2/discussions/3/reactions/4", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteTeamDiscussionReactionByOrgIDAndTeamID(ctx, 1, 2, 3, 4); err != nil {
		t.Errorf("DeleteTeamDiscussionReactionByTeamIDAndOrgID returned error: %v", err)
	}
}

func TestReactionsService_DeleteTeamDiscussionCommentReaction(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/orgs/o/teams/s/discussions/1/comments/2/reactions/3", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteTeamDiscussionCommentReaction(ctx, "o", "s", 1, 2, 3); err != nil {
		t.Errorf("DeleteTeamDiscussionCommentReaction returned error: %v", err)
	}
}

func TestReactionsService_DeleteTeamDiscussionCommentReactionByTeamIDAndOrgID(t *testing.T) {
	client, mux, _, teardown := setup()
	defer teardown()

	mux.HandleFunc("/organizations/1/team/2/discussions/3/comments/4/reactions/5", func(w http.ResponseWriter, r *http.Request) {
		testMethod(t, r, "DELETE")
		testHeader(t, r, "Accept", mediaTypeReactionsPreview)

		w.WriteHeader(http.StatusNoContent)
	})

	ctx := context.Background()
	if _, err := client.Reactions.DeleteTeamDiscussionCommentReactionByOrgIDAndTeamID(ctx, 1, 2, 3, 4, 5); err != nil {
		t.Errorf("DeleteTeamDiscussionCommentReactionByTeamIDAndOrgID returned error: %v", err)
	}
}
