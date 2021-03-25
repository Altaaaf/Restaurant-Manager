import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
	{
		title: 'Overview',
		path: '/overview',
		icon: <AiIcons.AiFillHome />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Inventory',
				path: '/overview/inventory',
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: 'Payroll',
				path: '/Overview/payroll',
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: 'Reports',
		path: '/reports/reports',
		icon: <IoIcons.IoIosPaper />,
		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Employee Performance',
				path: '/reports/reports/ep',
				icon: <IoIcons.IoIosPaper />,
				cName: 'sub-nav',
			},
			{
				title: 'Customer Reviews',
				path: '/reports/reports/cs',
				icon: <IoIcons.IoIosPaper />,
				cName: 'sub-nav',
			},
			{
				title: 'Maintenance',
				path: '/reports/reports/maintenance',
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: 'Menu',
		path: '',
		icon: <FaIcons.FaCartPlus />,
	},
	{
		title: 'Analytics',
		path: 'analytics/analytics',
		icon: <IoIcons.IoMdPeople />,
	},
	{
		title: 'Revenue',
		path: '/revenue/revenue',
		icon: <FaIcons.FaEnvelopeOpenText />,

		iconClosed: <RiIcons.RiArrowDownSFill />,
		iconOpened: <RiIcons.RiArrowUpSFill />,

		subNav: [
			{
				title: 'Message 1',
				path: '/messages/message1',
				icon: <IoIcons.IoIosPaper />,
			},
			{
				title: 'Message 2',
				path: '/messages/message2',
				icon: <IoIcons.IoIosPaper />,
			},
		],
	},
	{
		title: 'Users',
		path: '/users/users',
		icon: <IoIcons.IoMdHelpCircle />,
	},
	{
		title: 'Log Out',
		path: '/logout',
		icon: <IoIcons.IoMdHelpCircle />,
	},
];
