import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTemplates } from "../../store/actions/action.creator";

const OnBoarding = ({ total, templates, ...props }) => {
  const [showapp, setShowapp] = useState(false);
  //
  useEffect(() => {
    if (total > 0) {
      props.history.push("/form-template");
    } else {
      props.getTemplates();
    }
  }, [total]);

  return (
    <div>
      <h3>
        Welcome and have a nice On Boarding {total}, {JSON.stringify(templates)}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.template.loading,
  templates: state.template.form_template,
  failed: state.template.failed,
  total: state.template.total,
});

export default connect(mapStateToProps, { getTemplates })(OnBoarding);
