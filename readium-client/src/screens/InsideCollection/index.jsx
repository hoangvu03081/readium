import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useGetAllCollections } from "../../common/api/collectionQuery";
import PuffLoader from "../../common/components/PuffLoader";
import CollectionCard from "./CollectionCard";

const Layout = styled.div`
  margin: 160px auto 0;
  padding-bottom: 100px;
  width: 60%;
  @media (min-width: 1440px) {
    width: 850px;
  }
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
`;

export default function InsideCollection() {
  const { collectionId } = useParams();
  const { auth } = useAuth();
  const getAllCollections = useGetAllCollections(auth);
  const refetchList = () => {
    setTimeout(() => {
      getAllCollections.refetch();
    }, 300);
  };

  if (getAllCollections.isFetching) {
    return <PuffLoader />;
  }
  if (!getAllCollections.data || getAllCollections.isError) {
    return <div />;
  }
  const allCollections = getAllCollections.data.data;

  return (
    <Layout>
      {allCollections.map((collection) => {
        if (collection.id === collectionId) {
          if (collection.posts.length === 0) {
            return (
              <p key="emptyCollection" style={{ textAlign: "center" }}>
                This collection is empty.
              </p>
            );
          }
          return collection.posts.map((post) => (
            <CollectionCard
              key={post.id}
              post={post}
              collectionId={collection.id}
              refetchList={refetchList}
            />
          ));
        }
        return null;
      })}
    </Layout>
  );
}
