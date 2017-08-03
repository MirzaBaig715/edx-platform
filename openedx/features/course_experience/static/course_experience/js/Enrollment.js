
/*
 * Course Enrollment on the Course Home page
 */
export class CourseEnrollment {  // eslint-disable-line import/prefer-default-export
  /**
   * Redirect to a URL.  Mainly useful for mocking out in tests.
   * @param  {string} url The URL to redirect to.
   */
  static redirect(url) {
    window.location.href = url;
  }

  static refresh() {
    window.location.reload(false);
  }

  trackSelectionUrl() {
    return this.trackSelection + this.courseId;
  }

  createEnrollment() {
    const data = {
      course_details: { course_id: this.courseId },
    };
    $.ajax(
      {
        type: 'POST',
        url: this.enrollmentAPI,
        data,
      }).done(() => {
        this.refresh();
      }).fail(() => {
        this.redirect(this.trackSelectionUrl());
      });
  }
  constructor(buttonClass, courseId) {
    this.trackSelection = '/course_modes/choose/';
    this.enrollmentAPI = '/api/enrollment/v1/enrollment/';

    this.courseId = courseId;
    $(buttonClass).click(this.createEnrollment);
  }
}
