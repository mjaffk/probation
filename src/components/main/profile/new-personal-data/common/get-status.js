import React from "react"

export const getSchoolAttachedStatus = (isAttached) =>
	(isAttached) ?
		<div className="text-success">
			<i className="fa fa-check-circle mr-1"/>
			Прикреплен к учебному заведению
		</div> :
		<div className="text-danger">
			<i className="fa fa-times-circle mr-1"/>
			Не прикреплен к учебному заведению
		</div>


export const getSnilsUploadStatus = (isUpload) =>
	isUpload &&
	<div className="text-success">
		<i className="fa fa-check-circle mr-1"/>
		СНИЛС загружен
	</div>