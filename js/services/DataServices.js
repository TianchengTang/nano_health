/**
 * Created by Vinci on 2015/1/30 0030.
 */
angular.module("frintCA.dataServices", [])

  .service('dataService', ['$http', function ($http) {
    var urlBase = "http://api.fenyin.me/v1";

    this.sendMessage = function (phone, callback) {
      $.get(urlBase + "/verification/send?cellphone=" + phone + "&reason=ambassador_register", function (data, status) {
        callback(data, status);
      });
    };

    this.registerAmbassador = function (owner, phone, passwd, schoolId, applyletter, verification, callback) {
      $.post(urlBase + "/ambassador/register", {
        name: owner,
        cellphone: phone,
        password: passwd,
        verification_code: verification,
        school_id: schoolId,
        apply_letter: applyletter
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.login = function (phone, passswd, callback) {
      $.get(urlBase + "/ambassador/login?cellphone=" + phone + "&password=" + passswd, function (data, status) {
        callback(data, status);
      });
    };

    this.getWaitShops = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_unfinished_printshop", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    /**
     * 录入打印店
     *
     * @post cellphone          打印店手机号
     * @post password           打印店密码
     * @post name               打印店名称
     * @post bsprice            黑白单面打印价格
     * @post bdprice            黑白双面打印价格
     * @post bsprice_for          黑白单面打印对店价格
     * @post bdprice            黑白双面打印对店价格
     * @post promo              推广大使的推广码
     * @post payment_interval   打款周期
     * @post bank_name          银行卡开户行
     * @post sub_bank_name      银行卡开户支行
     * @post bank_card_no       银行卡卡号
     * @post bank_card_name     银行卡户名
     * @post alipay_account     支付宝账号
     * @post school_id          打印店初始关联学校
     * */
    this.startRegisterPrintShop = function (tk, shopInfo, promocode, callback) {
      $.post(urlBase + "/ambassador/start_add_shop",
        {
          cellphone: shopInfo.OwnerPhone,
          password: shopInfo.Password,
          address: shopInfo.Address,
          name: shopInfo.ShopName,
          bsprice: shopInfo.SinglePrice,
          bdprice: shopInfo.DoublePrice,
          bsprice_for_shop: shopInfo.SinglePriceForShop,
          bdprice_for_shop: shopInfo.DoublePriceForShop,
          promo: promocode,
          payment_interval: shopInfo.PayHalf ? 15 : 30,
          bank_name: shopInfo.Card.Name,
          sub_bank_name: shopInfo.Card.BranchName,
          bank_card_no: shopInfo.Card.Account,
          bank_card_name: shopInfo.Card.Owner,
          alipay_account: shopInfo.AliPay.Account,
          school_id: shopInfo.School.id,
          contact_number: shopInfo.ContactNumber,
          token: tk
        }, function (data, status) {
          callback(data, status);
        });
    };

    this.getAmbassadorInfo = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_info", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.updateAmbassadorInfo = function (tk, userInfo, callback) {
      $.post(urlBase + "/ambassador/update_info", {
        name: userInfo.name,
        gender: userInfo.gender == "男" ? "1" : "0",
        qq: userInfo.QQ,
        school_id: userInfo.School.id,
        address: userInfo.Address,
        finish_year: userInfo.FinishYear,
        whoami: userInfo.whoami,
        account_name: userInfo.AccountName,
        account_bank: userInfo.AccountBank,
        account_number: userInfo.AccountNumber,
        account_subbank: userInfo.AccountSubBank,
        account_city: userInfo.AccountCity,
        token: tk,
        mail: userInfo.email,
        school_area: userInfo.SchoolArea,
        area_student_count: userInfo.AreaStudentCount,
        major_id: userInfo.Major.id
      }, function (data, status) {
        callback(data, status);
      });
    };

    ////////////////////////////////////////////
    // Province|City|School Info API
    ///////////////////////////////////////////
    this.getProvinces = function (callback) {
      $.get(urlBase + "/geography/provinces", function (data, status) {
        callback(data, status);
      });
    };

    this.getCities = function (province_id, callback) {
      $.get(urlBase + "/geography/cities?province=" + province_id, function (data, status) {
        callback(data, status);
      });
    };

    this.getSchools = function (province_id, callback) {
      $.get(urlBase + "/geography/all_schools?province=" + province_id, function (data, status) {
        callback(data, status);
      });
    };

    this.getSchool = function (school_id, callback) {
      $.get(urlBase + "/geography/school_info?school_id=" + school_id, function (data, status) {
        callback(data, status);
      });
    };

    this.getMajor = function (school_id, callback) {
      $.get(urlBase + "/geography/majors?school=" + school_id, function (data, status) {
        callback(data, status);
      });
    };

    ////////////////////////////////////////////
    // File upload related API
    ////////////////////////////////////////////
    this.beginCreatePrintTaskInCart = function (tk) {
      var deferred = $.Deferred();
      $.ajax({
        type: 'POST',
        url: urlBase + '/ambassador/begin_create',
        data: {
          token: tk
        },
        success: function (res) {
          if (res.result == 'success') {
            // console.log('begin success', res);
            deferred.resolve(res);
          } else deferred.reject(res);
        },
        error: function (xhr, status, error) {
          // console.log('begin error', xhr, status, error);
          deferred.reject(null, xhr);
        }
      });
      return deferred;
    };

    this.endCreatePrintTaskInCart = function (tk, shop_id, key) {
      var deferred = $.Deferred();
      $.ajax({
        type: 'POST',
        url: urlBase + '/ambassador/upload_contract_for_shop',
        data: {
          token: tk,
          key: key,
          printshop_id: shop_id
        },
        success: function (res) {
          if (res.result == 'success') {
            // console.log('end success', res);
            deferred.resolve(res);
          } else deferred.reject(res);
        },
        error: function (xhr, status, error) {
          // console.log('end error', xhr, status, error);
          deferred.reject(null, xhr);
        }
      });
      return deferred;
    };

    this.uploadPrintShopContact = function (tk, printshop_id) {
      $('#uploadfileform')[0].action = urlBase + "/ambassador/upload_printshop_contact?token=" + tk + "&printshop_id=" + printshop_id;
      $('#uploadfileform')[0].submit();

      /*var deferred = $.Deferred();
       var request = new XMLHttpRequest();
       request.onload = function () {
       if (request.status >= 200 && request.status < 300) {
       // console.log('upload success', request);
       deferred.resolve();
       } else {
       deferred.reject(request);
       }
       };
       // Update loading progess
       request.upload.onprogress = function (e) {
       //$scope.fileList[index].percent = Math.round(e.loaded/e.total * 100);
       //$scope.$digest();
       };
       request.onerror = function () {
       // console.log('upload error', request);
       deferred.reject(request);
       };
       try {
       request.open('POST', urlBase + "/ambassador/upload_printshop_contact?token=" + tk + "&printshop_id=" + printshop_id, true);
       request.setRequestHeader('Content-Type', 'application/octet-stream');
       request.send({"file": file});
       } catch (e) {
       // console.log('upload error', e);
       deferred.reject(e);
       }
       return deferred;*/
    };

    this.uploadAmbassadorContact = function (tk) {
      $('#uploadambassadorform')[0].action = urlBase + "/ambassador/upload_ambassador_contact?token=" + tk;
      $('#uploadambassadorform')[0].submit();
    };


    this.uploadPrintShopFeedBack = function (tk, feedback, callback) {
      //TODO
      $.post(urlBase + "/ambassador/commit_printshop_review", {
        token: tk,
        printshop_id: feedback.printshop_id,
        score: feedback.score,
        message: feedback.smgui,
        problems: feedback.problems
      }, function (data, status) {
        callback(data, status);
      });
    };


    this.getUnfinishedTasks = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_tasks", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getAmbassadorForApply = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_ambassador_for_apply", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getShopForApply = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_shop_for_apply", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.finishTask = function (tk, taskId, callback) {
      $.post(urlBase + "/ambassador/finish_task", {
        token: tk,
        task_id: taskId
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.applyCa = function (tk, id, callback) {
      $.post(urlBase + "/ambassador/apply_ambassador", {
        token: tk,
        id: id
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.denyCa = function (tk, id, callback) {
      $.post(urlBase + "/ambassador/deny_ambassador", {
        token: tk,
        id: id
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.applyPs = function (tk, id, callback) {
      $.post(urlBase + "/ambassador/apply_shop", {
        token: tk,
        id: id
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.denyPs = function (tk, id, callback) {
      $.post(urlBase + "/ambassador/deny_shop", {
        token: tk,
        id: id
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getActiveUser = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_pay_user_count", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    // 推广码
    this.newGroundPromo = function (tk, Pcodes, callback) {
      $.post(urlBase + "/ambassador/new_ground_promo", {
        token: tk,
        limit_province: Pcodes.Province.id,
        limit_city: Pcodes.City.id,
        limit_school: Pcodes.School.id,
        name: Pcodes.IdName
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getGroundPromo = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_ground_promo", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getSchoolUserCount = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_school_user_count", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getPrintShops = function (tk, callback) {
      if (tk === null || typeof(tk) === "undefined") return;
      $http.get(urlBase + '/monitor/print_shops?token=' + tk, {})
        .success(function (data) {
          callback(data);
        })
        .error(function (data) {
          callback(data);
        });
    };

    this.getPrintShopInfo = function (shop_id, tk, callback) {
      if (tk === null || typeof(tk) === "undefined") return;
      $http.get(urlBase + "/print_shop/public_info?printshop_id=" + shop_id + "&token=" + tk, {})
        .success(function (data, status) {
          callback(data);
        })
        .error(function (data, status) {
          //callback(data);
        })
    };

    this.getAmbassadorByPromo = function (promo, callback) {
      $.get(urlBase + "/ambassador/get_ambassador_by_promo?promo_code=" + promo, function (data, status) {
        callback(data, status);
      });
    };

    this.getPartTimeLogs = function (tk, callback) {
      $.get(urlBase + "/ambassador/get_part_time_log?token=" + tk, function (data, status) {
        callback(data, status);
      });
    };

    this.getSchoolRegisterCountByDate = function (tk, on_date, i, callback) {
      $.post(urlBase + "/ambassador/get_school_register_count_by_date", {
        token: tk,
        date: on_date
      }, function (data, status) {
        data.inx = i;
        callback(data, status);
      });
    };

    this.getSchoolUserCount = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_school_user_count", {
        token: tk
      }, function (data, status) {
        callback(data, status);
      });
    };

    this.getAmbassadorPromoUserCount = function (tk, callback) {
      $.post(urlBase + "/ambassador/get_ambassador_promo_user_count", {
        token: tk
      }, function (data, status) {
        callback(data,status);
      });
    };

    this.getTenDayView = function (tk, callback) {
        $.post(urlBase + "/ambassador/get_ten_day_view", {
            token: tk
        }, function (data, status) {
            callback(data,status);
        });
    };

    this.getFrontNumbers = function (tk, date, callback) {
      $.get(urlBase + "/ambassador/front_numbers?token=" + tk + "&date=" + date, function (data, status) {
        callback(data, status);
      });
    };

    this.createHistogram = function(labels, frontData, selectId, names) {
      if($(selectId).height()){
        return;
      }
      var width = $(selectId).width();
      var height = 200;
      
      var svg = d3.select(selectId)			//toDO
        .append("svg")			//在<body>中添加<svg>
        .attr("width", width)	//设定<svg>的宽度属性
        .attr("height", height); //高度

      var dataset = [];
      // var dateset2 = [];
      var active = [];
      var inactive = [];

      labels.forEach(function (label) {
        var newLabel = label.substring(6,11);
        if(!(label in frontData)){
          active.push({time:newLabel, count:0});
          inactive.push({time:newLabel, count:0});
        }
        else{
          active.push({time:newLabel, count: parseInt(frontData[label].active_count)});
          inactive.push({time:newLabel, count: parseInt(frontData[label].register_count)});
        }
      });

      dataset.push({name: names[0], numbers: active});
      dataset.push({name: names[1], numbers: inactive});

      //create new layout
      var stack = d3.layout.stack()
        .values(function (d) {
          return d.numbers;
        })
        .x(function (d) {
          return d.time;
        })
        .y(function (d) {
          return d.count;
        });

      //init data, compute the y-coordinate, and then propagate that baseline to the other layers
      var data = stack(dataset);
      console.log(data);

      var padding = {left: 50, right: 100, top: 20, bottom: 20};
      var xRangeWidth = width - padding.left - padding.right;

      var xScale = d3.scale.ordinal()
        .domain(data[0].numbers.map(function (d) {
          return d.time;
        }))
        .rangeBands([0, xRangeWidth], 0.3);

      var maxCount = d3.max(data[data.length - 1].numbers, function (d) {
        return parseInt(d.y0) + parseInt(d.y);
      });

      var yRangeWidth = height - padding.top - padding.bottom;

      var yScale = d3.scale.linear()
        .domain([0, maxCount])		//定义域
        .range([0, yRangeWidth]);

      var color = ["#4F606F", "#54C2E6"];

      //添加分组元素
      var groups = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .style("fill", function (d, i) {
          return color[i];
        });

      var rects = groups.selectAll("rect")
        .data(function (d) {
          return d.numbers;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return xScale(d.time);
        })
        .attr("y", function (d) {
          return yRangeWidth - yScale(d.y0 + d.y);
        })
        .attr("width", function (d) {
          return xScale.rangeBand();
        })
        .attr("height", function (d) {
          return yScale(d.y);
        })
        .attr("transform", "translate(" + padding.left + ","
        + padding.top + ")");

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

      yScale.range([yRangeWidth, 0]);

      var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

      svg.append('g')
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis);

      svg.append('g')
        .attr("class","axis")
        .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis);

      var labHeight = 50;
      var labRadius = 10;

      var labelCircle = groups.append("circle")
        .attr("cx", function(d){ return width - padding.right;})
        .attr("cy", function(d,i){ return padding.top * 2 +labHeight * i})
        .attr("r",labRadius);

      var labelText = groups.append("text")
        .attr("x", function(d){ return width - padding.right*0.9;})
        .attr("y", function(d,i){ return padding.top * 2 +labHeight * i})
        .attr("dy",labRadius/2)
        .text(function(d){ return d.name; });
    };

  }]);