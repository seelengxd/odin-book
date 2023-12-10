-- AlterTable
CREATE SEQUENCE friendrequest_id_seq;
ALTER TABLE "FriendRequest" ALTER COLUMN "id" SET DEFAULT nextval('friendrequest_id_seq');
ALTER SEQUENCE friendrequest_id_seq OWNED BY "FriendRequest"."id";
