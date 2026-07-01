class PAGES {
	private BASE_URL = ''

	public DASHBOARD = this.BASE_URL + '/dashboard'
	public ROOM = this.BASE_URL + '/room'

	public LOGIN = this.BASE_URL + '/login'
	public REGISTER = this.BASE_URL + '/register'
	public EMAIL_VERIFICATION = this.BASE_URL + '/auth/new-verification'

	public PASSWORD_RESET = this.BASE_URL + '/auth/password-reset'
	public PASSWORD_NEW = this.BASE_URL + '/auth/new-password'
}

export const PAGES_CONFIG = new PAGES()
