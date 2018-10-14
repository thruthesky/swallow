import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { firestore } from "firebase";

export const Error_Permission_Denied = "Unauthorized Access";

export interface PostData {
	category?: string;
	title?: string;
	content?: string;
	uid?: string;
	id?: string; // this is need for doc reference
	created_at?: any;
	updated_at?: any;
	deleted?: boolean;
}

@Injectable({
	providedIn: "root"
})
export class PostsService {
	constructor(private auth: AuthService) {}

	/**
	 * @desc this is reference path to collection of post & doc
	 */
	colPost() {
		return this.auth.docDomain.collection("posts");
	}

	docPost(uid) {
		return this.colPost().doc(uid);
	}

	/**
	 * @desc will create and return post.
	 * @param post expeccted data from user.
	 */

	async createPost(post: PostData): Promise<PostData> {
		post.created_at = firestore.FieldValue.serverTimestamp();
		const response = await this.colPost().add(post);
		return this.getPost(response.id);
	}

	/**
	 * @desc will  fetch post data.
	 * @param uid is used as doc reference for fetching data.
	 */

	async getPost(uid: string): Promise<PostData> {
		return await this.docPost(uid)
			.ref.get()
			.then(doc => {
				if (doc.exists) {
					const post: PostData = doc.data();
					post.id = uid;
					return post;
				} else {
					return null;
				}
			});
	}

	async getPosts(): Promise<firestore.QuerySnapshot> {
		return await this.colPost().ref.get();
	}

	/**
	 * @desc will update and return updated post
	 * @param id is the doc reference id
	 * @param post is the data expected when update
	 */

	async updatePost(id: string, post: PostData): Promise<PostData> {
		post.updated_at = firestore.FieldValue.serverTimestamp();
		await this.docPost(id).update(post);
		return this.getPost(post.uid);
	}

	async deletePost(id: string): Promise<PostData> {
		const post: PostData = {
			title: "TITLE_DELETED",
			content: "CONTENT_DELETED",
			deleted: true
		};
		return await this.updatePost(id, post);
	}
}
