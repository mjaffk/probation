import React from "react"
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {Link} from "react-router-dom"

export default function ProfileBreadCrumb({location}) {
	return (<div id="breadcrumb"  >
		<Breadcrumb tag="nav" className="rounder">
			<BreadcrumbItem><Link to='/profile/'>Личный кабинет</Link></BreadcrumbItem>
			<BreadcrumbItem active>{location}</BreadcrumbItem>
		</Breadcrumb>
	</div>)
}

