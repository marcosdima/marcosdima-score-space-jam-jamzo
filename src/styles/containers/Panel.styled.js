import styled from 'styled-components';

const Panel = styled.section`
	width: 100%;
	max-width: 960px;
	background: ${({ theme }) => theme.colors.surface};
	color: ${({ theme }) => theme.colors.text};
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: 10px;
	padding: 14px;
	margin-bottom: 12px;
`;

export default Panel;
